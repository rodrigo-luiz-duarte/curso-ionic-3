import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _usuarioService: UsuarioServiceProvider
  ) {}

  get usuarioLogado() {
    return this._usuarioService.usuarioLogado;
  }
}
