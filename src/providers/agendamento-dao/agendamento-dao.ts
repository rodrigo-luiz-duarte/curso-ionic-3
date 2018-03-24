import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Agendamento } from '../../modelos/agendamento';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgendamentoDaoProvider {

  constructor(
    private _storage: Storage
  ) {}

  salve(agendamento: Agendamento) {
    let chave = this._gereChave(agendamento);
    let promise = this._storage.set(chave, agendamento);

    return Observable.fromPromise(promise);
  }

  private _gereChave(agendamento: Agendamento) {
    let chave = agendamento.emailCliente + agendamento.data.substr(0, 10);
    return chave;
  }

  jaExiste(agendamento: Agendamento) {
    let chave = this._gereChave(agendamento);
    let promise = this._storage
                      .get(chave)
                      .then((dado) => dado ? true : false);

    return Observable.fromPromise(promise);
  }

  listaTodos() {
    let agendamentos: Agendamento[] = [];

    let promise = this._storage.forEach((agendamento: Agendamento) => {
      agendamentos.push(agendamento);
    })
    .then(() => agendamentos);

    return Observable.fromPromise(promise);
  }

}
