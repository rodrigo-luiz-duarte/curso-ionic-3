import { Injectable } from '@angular/core';

@Injectable()
export class ApiUrlProvider {

  private _urlBase: string = 'http://197.50.24.103:8080/api';

  constructor() {}

  get urlBase() {
    return  this._urlBase;
  }
}
