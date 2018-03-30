import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ListaAgendamentoPage } from '../pages/lista-agendamento/lista-agendamento';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { UsuarioServiceProvider } from '../providers/usuario-service/usuario-service';
@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = LoginPage;

  @ViewChild(Nav)
  public nav: Nav;

  public paginas = [
    { titulo: 'Agendamentos', componente: ListaAgendamentoPage.name, icone: 'calendar' },
    { titulo: 'Perfil', componente: PerfilPage.name, icone: 'person' }
  ];

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private _usuarioService: UsuarioServiceProvider
  ) 
    {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  irParaPagina(componente) {
    this.nav.push(componente);
  }

  get usuarioLogado() {
    return this._usuarioService.usuarioLogado;
  }

  get avatar() {
    return this._usuarioService.avatar;
  }

}

