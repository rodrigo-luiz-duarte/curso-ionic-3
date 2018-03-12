import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Carro } from '../../modelos/carro';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  private _carro: Carro;
  private _precoTotal: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {

      this._carro = this.navParams.get('carroSelecionado');
      this._precoTotal = this.navParams.get('precoTotal');
  }

  get carro() {
    return this._carro;
  }

  get precoTotal() {
    return this._precoTotal;
  }

}
