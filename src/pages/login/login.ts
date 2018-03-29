import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';
import { Usuario } from '../../modelos/usuario';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public email: string = 'joao@alura.com.br';
  public senha: string = 'alura123';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _usuarioService: UsuarioServiceProvider,
    private _alertCtrl: AlertController
  ) {}

  efetuaLogin() {
    console.log('Email:', this.email);
    console.log('Senha: ', this.senha);

    this._usuarioService.efetuaLogin(this.email, this.senha)
        .subscribe(
          (usuario: Usuario) => {
            console.log('Usuario: ', usuario);
            this.navCtrl.setRoot(HomePage);
          }
          ,
          () => {
            this._alertCtrl.create(
              {
                title: 'Falha no login',
                subTitle: 'Usuário e/ou senha inválidos.',
                buttons: [
                  { text: 'Ok'}
                ]
              }).present();
          }
        );

  }

}
