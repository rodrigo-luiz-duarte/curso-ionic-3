import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from '../../modelos/agendamento';
import { AgendamentoServiceProvider } from '../../providers/agendamento-service/agendamento-service';

@IonicPage()
@Component({
  selector: 'page-lista-agendamento',
  templateUrl: 'lista-agendamento.html',
})
export class ListaAgendamentoPage {

  private _agendamentos: Agendamento[];
  private _alerta: Alert;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _agendamentoDao: AgendamentoDaoProvider,
    private _alertCtrl: AlertController,
    private _agendamentoService: AgendamentoServiceProvider
  ) {
  }

  ionViewDidLoad() {
    this._agendamentoDao.listaTodos()
        .subscribe(
          (agendamentos: Agendamento[]) => {
            this._agendamentos = agendamentos;
          }
        )
  }

  get agendamentos() {
    return this._agendamentos;
  }

  reenvie(agendamento: Agendamento) {

    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      subTitle: '',
      buttons: [
        { 
          text: 'Ok' 
        }
      ]
    });

    let mensagem: string;

    this._agendamentoService.agende(agendamento)
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
          () => mensagem = 'Agendamento reenviado com sucesso.',
          (erro: Error) => {
            console.log('Erro: ', erro);
            mensagem = erro.message;
          }
        );
  }

}
