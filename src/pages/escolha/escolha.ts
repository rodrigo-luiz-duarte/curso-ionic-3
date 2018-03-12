import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { Acessorio } from '../../modelos/acessorio';
import { CadastroPage } from '../cadastro/cadastro';

@IonicPage()
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})

export class EscolhaPage {

  private _carro: Carro;
  private _acessorios: Array<Acessorio>;
  private _precoTotal: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {

    this._carro = this.navParams.get('carroSelecionado');

    this._acessorios = [
      { nome: 'Freio ABS', preco: 800},
      { nome: 'Ar-condicionado', preco: 1000},
      { nome: 'MP3 Player', preco: 500}
    ];

    this._precoTotal = this._carro.preco;

  }

  get carro() {
    return this._carro;
  }

  get acessorios() {
    return this._acessorios;
  }

  get precoTotal() {
    return this._precoTotal;
  }

  atualizeTotal(checked: boolean, acessorio: Acessorio ) {
    checked ?
      this._precoTotal += acessorio.preco :
      this._precoTotal -= acessorio.preco;
  }

  avanceCadastro() {
    this.navCtrl.push(CadastroPage.name, {
      carroSelecionado: this._carro,
      precoTotal: this._precoTotal
    });
  }

}
