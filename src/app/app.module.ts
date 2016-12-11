import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ContasPage } from '../pages/contas/contas';
import { ModalContasPage } from '../pages/modal-contas/modal-contas';
import { Storage } from '@ionic/storage';
import { Utils } from './utils';
import { DAOContas } from '../dao/dao-contas';
import { DAOLancamentos } from '../dao/dao-lancamentos';
import { LancamentosPage } from '../pages/lancamentos/lancamentos';
import { ModalLancamentoPage } from '../pages/modal-lancamento/modal-lancamento';
import { SaldoPage } from '../pages/saldo/saldo';
import { RelatorioPage } from '../pages/relatorio/relatorio';
import { DateFilter } from '../components/date-filter';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ContasPage,
        ModalContasPage,
        LancamentosPage,
        ModalLancamentoPage,
        SaldoPage,
        RelatorioPage,
        DateFilter
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ContasPage,
        ModalContasPage,
        LancamentosPage,
        ModalLancamentoPage,
        SaldoPage,
        RelatorioPage
    ],
    providers: [
        Storage, Utils, DAOLancamentos, DAOContas
    ]
})
export class AppModule { }
