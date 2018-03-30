import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agendamento } from '../../modelos/agendamento';
import { Observable } from 'rxjs/Observable';
import { ApiUrlProvider } from '../api-url/api-url';

const AGENDAMENTO_ENDPOINT: string = '/agendamento/agenda';
@Injectable()
export class AgendamentoServiceProvider {

  constructor(
    private _apiUrl: ApiUrlProvider,
    private _http: HttpClient
  ) {}

  agende(agendamento: Agendamento) { 

    let url: string = this._apiUrl.urlBase + AGENDAMENTO_ENDPOINT;
    
    return this._http
                .post(url, agendamento)
                .do(() => agendamento.enviado = true)
                .catch((err) => Observable.of(new Error('Falha no agendamento. Tente mais tarde.')));
  }

}
