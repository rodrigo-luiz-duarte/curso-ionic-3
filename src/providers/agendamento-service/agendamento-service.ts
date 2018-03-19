import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agendamento } from '../../modelos/agendamento';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgendamentoServiceProvider {

  private _urlBase: string = 'http://localhost:8080/api';
  private _agendamentoEndpoit: string = '/agendamento/agenda';

  constructor(
    private _http: HttpClient
  ) {}

  agende(agendamento: Agendamento) { 

    let url:string = this._urlBase + this._agendamentoEndpoit;
    return this._http
                .post(url, agendamento)
                .do(() => agendamento.enviado = true)
                .catch((err) => Observable.of(new Error('Falha no agendamento. Tente mais tarde.')));
  }

}
