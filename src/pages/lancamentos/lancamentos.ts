import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, Events } from 'ionic-angular';
import { DAOLancamentos } from '../../dao/dao-lancamentos';
import { ModalLancamentoPage } from '../modal-lancamento/modal-lancamento';
import { Toast } from 'ionic-native';
import { Utils } from '../../app/utils';
import { DateFilter } from '../../components/date-filter';
import { RelatorioPage } from '../relatorio/relatorio';

@Component({
    selector: 'page-lancamentos',
    templateUrl: 'lancamentos.html'
})
export class LancamentosPage {

    public listLancamentos: any[];
    public dataFiltro: Date;// = new Date(2000, 1, 1);

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController, private dao: DAOLancamentos, public events: Events) {
        //this.dao.initDB();
        this.dataFiltro = new Date();

        this.events.subscribe('dao:ready', (db) => {
            // userEventData is an array of parameters, so grab our first and only arg
            console.log('Evento "dao:ready" disparado...:', db);

            this.getListaLancamentos();
        });// fim evento
    }

    ionViewDidLoad() {
        console.log('Hello LancamentosPage Page');
    }

    ionViewLoaded() {
        console.log('Hello LancamentosPage ionViewLoaded');
    }

    ionViewDidEnter() {
        console.log('Hello LancamentosPage ionViewDidEnter');
        this.getListaLancamentos();
    }
    updateMonth(data) {
        //alert("Mês alterado." + data);
        this.dataFiltro = data;
        this.getListaLancamentos();
    }

    getListaLancamentos() {
        let dtIni = Utils.getFirstDay(this.dataFiltro);
        let dtFim = Utils.getLastDay(this.dataFiltro);

        this.dao.getList(dtIni, dtFim, (lista) => {
            this.listLancamentos = lista;
        });

    }
    insert() {
        let modal = this.modalCtrl.create(ModalLancamentoPage);
        modal.onDidDismiss(lancamento => {
            this.getData(lancamento, false);
            this.updateMonth(new Date(lancamento.data));
        });
        modal.present();
    }

    edit(lancamento) {
        let modal = this.modalCtrl.create(ModalLancamentoPage, { parametro: lancamento });
        modal.onDidDismiss(data => this.getData(data, true));
        modal.present();
    }

    delete(lancamento) {
        let confirm = this.alertCtrl.create({
            title: 'Excluir',
            message: 'Gostaria realmente de excluir o lançamento: ' + lancamento.descricao + '?',
            buttons: [{
                text: 'Sim', handler: () => {
                    this.deleteConta(lancamento);
                }
            }, { text: 'Não' }]
        });
        confirm.present();
    }
    getDate(date) {
        return Utils.parseString(date);
    }
    lancamentoEntradaSaida(lancamento) {
        return lancamento.entradaSaida == "entrada" ? true : false;
    }
    changePaymentStatus(lancamento) {
        lancamento.pago = lancamento.pago ? 0 : 1;
        this.dao.edit(lancamento, (lanc) => {
            this.updateMonth(new Date(lancamento.data));
        });
    }
    paymentButtonText(lancamento) {
        return lancamento.pago ? "Reabrir" : "Pagar";
    }
    onClickMonth() {
        console.log(this.dataFiltro);
        this.navCtrl.push(RelatorioPage, { parametro: this.dataFiltro });
    }
    private deleteConta(lancamento) {
        this.dao.delete(lancamento, (data) => {
            this.updateMonth(new Date(lancamento.data));
            Toast.showShortBottom('Lançamento excluído com sucesso').subscribe((toast) => {
                console.log(toast);
            })
        });
    }
    private getData(data, edit: boolean): void {
        console.log(data);

        if (!(data == null)) {
            if (edit)
                this.dao.edit(data, (lancamento) => {
                    this.updateMonth(new Date(lancamento.data));
                    Toast.showShortBottom('Lançamento alterado com sucesso').subscribe((toast) => {
                        console.log(toast);
                    })
                });
            else
                this.dao.insert(data, (lancamento) => {
                    this.updateMonth(new Date(lancamento.data));
                    Toast.showShortBottom('Lançamento inserido com sucesso').subscribe((toast) => {
                        console.log(toast);
                    })
                });
        }
    }
}
