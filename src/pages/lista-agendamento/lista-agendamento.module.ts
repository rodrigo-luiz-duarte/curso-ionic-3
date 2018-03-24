import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaAgendamentoPage } from './lista-agendamento';

@NgModule({
  declarations: [
    ListaAgendamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaAgendamentoPage),
  ],
  exports: [
    ListaAgendamentoPage
  ]
})
export class ListaAgendamentoPageModule {}
