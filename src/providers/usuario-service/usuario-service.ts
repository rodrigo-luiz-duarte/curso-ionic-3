import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/usuario';

@Injectable()
export class UsuarioServiceProvider {

  private _usuarioLogado: Usuario;
  private _url: string = 'http://localhost:8080/api/login';

  constructor(private _http: HttpClient
  ) {}

  efetuaLogin(email: string, senha: string) {
    return this._http.post<Usuario>(this._url, {email, senha})
              .do(usuario => this._usuarioLogado = usuario);
  }

  get usuarioLogado() {
    return this._usuarioLogado;
  }
}
