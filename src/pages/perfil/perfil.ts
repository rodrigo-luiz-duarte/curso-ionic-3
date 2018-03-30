import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL } from 'ionic-angular';
import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _usuarioService: UsuarioServiceProvider,
    private _camera: Camera
  ) {}

  get usuarioLogado() {
    return this._usuarioService.usuarioLogado;
  }

  tiraFoto() {
    this._camera.getPicture(
      {
        destinationType: this._camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: true,
        correctOrientation: true
      }
    )
    .then( fotoUri => {
      fotoUri = normalizeURL(fotoUri);
      this._usuarioService.salveAvatar(fotoUri);
    })
    .catch( err => console.log('Falha ao tirar foto: ', err));
  }

  get avatar() {
    return this._usuarioService.avatar;
  }

}
