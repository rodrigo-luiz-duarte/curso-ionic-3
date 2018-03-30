import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert, Platform } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { AgendamentoServiceProvider } from '../../providers/agendamento-service/agendamento-service';
import { Agendamento } from '../../modelos/agendamento';
import { HomePage } from '../home/home';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { Vibration } from '@ionic-native/vibration';
import { DatePicker } from '@ionic-native/date-picker';
@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  private _carro: Carro;
  private _precoTotal: number;
  private _alerta:Alert;

  public nome:string;
  public endereco:string;
  public email:string;
  public data:string = new Date().toISOString();

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private _alertCtrl: AlertController,
      private _agendamentoService: AgendamentoServiceProvider,
      private _agendamentoDao: AgendamentoDaoProvider,
      private _vibration: Vibration,
      private _datePicker: DatePicker,
      private _plataform: Platform
  ) {

      this._carro = this.navParams.get('carroSelecionado');
      this._precoTotal = this.navParams.get('precoTotal');
  }

  get carro() {
    return this._carro;
  }

  get precoTotal() {
    return this._precoTotal;
  }

  crieAlerta() {

    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      subTitle: '',
      buttons: [
        { 
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          } 
        }
      ]
    });
  }

  private _valideCampos(): boolean {

    if (!this.nome || !this.endereco || !this.email) {

      this._vibration.vibrate(500);

      this._alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'Preencha todos os campos.',
        buttons: [
          { 
            text: 'Ok' 
          }
        ]
      }).present();

      return false;
    }

    return true;
  }

  agende() {

    if (!this._valideCampos()) {
      return;
    }

    let agendamento: Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      data: this.data,
      modeloCarro: this._carro.nome,
      precoTotal: this._precoTotal,
      confirmado: false,
      enviado: false
    }

    this.crieAlerta();

    let mensagem: string;

    this._agendamentoDao.jaExiste(agendamento)
        .mergeMap((existe) => {

          if (existe) {
            throw new Error('Agendamento já existente.');
          }

          return this._agendamentoService.agende(agendamento);
        })
        .mergeMap((result) => {

          let observable = this._agendamentoDao.salve(agendamento);

          if (result instanceof Error) {
            throw result;
          }

          return observable;
        })
        .finally(
          () => {
            this._alerta.setSubTitle(mensagem);
            this._alerta.present();
          }
        )
        .subscribe(
          () => mensagem = 'Agendamento realizado com sucesso.',
          (erro: Error) => {
            console.log('Erro: ', erro);
            mensagem = erro.message;
          }
        );
  }

  selecioneData() {

    if (this.ehUmDispositivo()) {
      
      this._datePicker.show(
        {
          date: new Date(),
          mode: 'date',
          locale: 'pt-BR',
          cancelButtonLabel: 'Cancelar'
        }
      )
      .then( data => {
  
        if (data) {
          this.data = data.toISOString()
        }
      });
    }
  }

  ehUmDispositivo() : boolean {

    let result: boolean = false;
    let plataformas: Array<string> = this._plataform.platforms();
    result = plataformas.indexOf('mobileweb') === -1;

    return result;
  }

}
