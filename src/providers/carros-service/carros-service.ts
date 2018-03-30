import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carro } from '../../modelos/carro';
import { ApiUrlProvider } from '../api-url/api-url';

const LISTA_CARROS_ENDPOINT: string = '/carro/listaTodos';
@Injectable()
export class CarrosServiceProvider {

  constructor(
    private _apiUrl: ApiUrlProvider,
    private _http: HttpClient
  ) {}

  lista() {

    let url: string = this._apiUrl.urlBase + LISTA_CARROS_ENDPOINT;

    return this._http.get<Carro[]>(url);
  }

}
