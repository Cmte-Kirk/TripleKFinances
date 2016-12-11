import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../app/utils';
import { DAOLancamentos } from '../../dao/dao-lancamentos';
/*
  Generated class for the Relatorio page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-relatorio',
    templateUrl: 'relatorio.html'
})
export class RelatorioPage {

    private dataFiltro;
    public listaContas;
    public entradaSaida;
    constructor(public navCtrl: NavController, private dao: DAOLancamentos, public params: NavParams) {
        this.entradaSaida = "entrada";
        this.dataFiltro = params.get('parametro');
        this.getList(this.entradaSaida);
    }

    ionViewDidLoad() {
        console.log('Hello RelatorioPage Page');
    }
    onSelect(entradaSaida) {
        this.getList(entradaSaida);
    }

    private getList(entradaSaida) {
        let dtIni = Utils.getFirstDay(this.dataFiltro);
        let dtFim = Utils.getLastDay(this.dataFiltro);
        //console.log(this.dataFiltro);
        this.dao.getListGroupByContas(dtIni, dtFim, entradaSaida, (listaContas) => {
            this.listaContas = listaContas;
            this.calcPercentual();
        });
    }
    private calcTotal() {
        let total = 0;
        console.log(this.listaContas.length);
        for (let i = 0; i < this.listaContas.length; i++) {
            total += this.listaContas[i].saldo;
        }
        return total;
    }
    private calcPercentual() {
        let total = this.calcTotal();
        console.log(total);
        for (let i = 0; i < this.listaContas.length; i++) {
            this.listaContas[i].percentual = (this.listaContas[i].saldo / total) * 100;
        }
    }
}
