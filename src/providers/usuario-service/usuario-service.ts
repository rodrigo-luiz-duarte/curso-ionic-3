import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/usuario';
import { ApiUrlProvider } from '../api-url/api-url';

const LOGIN_ENDPOINT: string = '/login';
const CHAVE_AVATAR: string = '';
@Injectable()
export class UsuarioServiceProvider {

  private _usuarioLogado: Usuario;

  constructor(
    private _apiUrl: ApiUrlProvider,
    private _http: HttpClient
  ) {}

  efetuaLogin(email: string, senha: string) {

    let url: string = this._apiUrl.urlBase + LOGIN_ENDPOINT;

    return this._http.post<Usuario>(url, {email, senha})
              .do(usuario => this._usuarioLogado = usuario);
  }

  get usuarioLogado() {
    return this._usuarioLogado;
  }

  salveAvatar(avatar) {
    localStorage.setItem(CHAVE_AVATAR, avatar);
  }

  get avatar() {
    
    return localStorage.getItem(CHAVE_AVATAR)
            ? localStorage.getItem(CHAVE_AVATAR)
            : 'assets/img/avatar-padrao.jpg';
  }

}
