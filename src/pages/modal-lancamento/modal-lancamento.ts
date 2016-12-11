import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Utils } from '../../app/utils'
import { DAOContas } from '../../dao/dao-contas';

@Component({
    selector: 'page-modal-lancamento',
    templateUrl: 'modal-lancamento.html'
})
export class ModalLancamentoPage {

    descricao: any;
    valor: any;
    data: any;
    conta: any;
    entradaSaida: any;
    pago: any;

    public lancamento: any;
    public contas: any[];
    private lancbkp: any = {};

    constructor(public viewCtrl: ViewController, private dao: DAOContas, public params: NavParams) {
        this.lancamento = params.get("parametro") || {};
        Utils.copy(this.lancamento, this.lancbkp);

        this.descricao = this.lancamento.descricao;
        this.valor = this.lancamento.valor;
        this.data = Utils.formatDate(this.lancamento.data);
        this.conta = this.lancamento.conta;
        this.entradaSaida = this.lancamento.entradaSaida;
        this.pago = this.lancamento.pago;

        console.log(this.lancamento);
    }

    ionViewDidLoad() {
        console.log('Hello ModalLancamentoPage Page');
    }

    ionViewDidEnter() {
        console.log('Hello ContasPage ionViewDidEnter');
        this.dao.getList((lista) => {
            this.contas = lista;
        });
    }

    cancel() {
        Utils.copy(this.lancbkp, this.lancamento);
        this.viewCtrl.dismiss();
    }

    salvar() {
        this.lancamento.descricao = this.descricao;
        this.lancamento.valor = this.valor;
        this.lancamento.data = Utils.parseDate(this.data).getTime();
        this.lancamento.conta = this.conta;
        this.lancamento.entradaSaida = this.entradaSaida;
        this.lancamento.pago = this.pago ? 1 : 0;

        this.viewCtrl.dismiss(this.lancamento);
    }

}
