import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { DAOLancamentos } from '../../dao/dao-lancamentos';


@Component({
    selector: 'page-saldo',
    templateUrl: 'saldo.html'
})
export class SaldoPage {

    public saldo = 0;
    constructor(public navCtrl: NavController, private dao: DAOLancamentos, public events: Events) {
        this.events.subscribe('dao:ready', (db) => {
            // userEventData is an array of parameters, so grab our first and only arg
            console.log('Evento "dao:ready" disparado...:', db);

            this.getSaldo();
        });// fim evento

        this.events.subscribe('saldo:update', (sd) => {
            this.saldo = parseFloat(sd);
        });// fim evento
    }

    ionViewDidLoad() {
        console.log('Hello SaldoPage Page');
    }

    ionViewDidEnter() {
        console.log('Hello LancamentosPage ionViewDidEnter');
        this.getSaldo();
    }

    getSaldo() {
        this.dao.getSaldo((sd) => {
            this.saldo = sd;
        });
    }

    coloreSaldo() {
        return this.saldo < 0 ? "danger" : "favorite";
    }

}
