import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { ContasPage } from '../pages/contas/contas';
import { LancamentosPage } from '../pages/lancamentos/lancamentos';
import { DAOLancamentos } from '../dao/dao-lancamentos';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    home = HomePage;
    contas = ContasPage;
    lancamento = LancamentosPage;

    rootPage = this.home;

    constructor(platform: Platform) {
        platform.ready().then(() => {

            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });

    }

    openPage(opcao) {
        this.rootPage = opcao;
    }
}
