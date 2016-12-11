import { Component } from '@angular/core';
import { NavController, Platform, Events } from 'ionic-angular';
import { DAOLancamentos } from '../../dao/dao-lancamentos';
import { LancamentosPage } from '../lancamentos/lancamentos'
import { SaldoPage } from '../saldo/saldo';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    lancamentos: any;
    saldo: any;
    constructor(public navCtrl: NavController, platform: Platform, private daoLanc: DAOLancamentos,private events: Events) {
        // platform.registerBackButtonAction(() => {
        //     //https://github.com/driftyco/ionic/issues/6982
        //     let element = document.getElementsByTagName('ion-app')[0];
        //     let existOverlay = element.classList.contains('disable-scroll');
        //
        //     if (!existOverlay) {
        //         //let nav = app.getRootNav();
        //         let nav = navCtrl;
        //
        //         if (nav.canGoBack()) {
        //             nav.pop();
        //         }
        //         else {
        //             //this.confirmExit();
        //             return false;
        //         }
        //     }
        // }, 100);


        this.lancamentos = LancamentosPage;
        this.saldo = SaldoPage;
    }

    ionViewDidLoad() {
        console.log('Hello HomePage Page');
    }
    updateSaldo() {
      this.daoLanc.getSaldo((saldo) => {
          this.events.publish('saldo:update', saldo);
      });
    }
}
