import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';


@Component({
    selector: 'page-modal-contas',
    templateUrl: 'modal-contas.html'
})
export class ModalContasPage {

    public conta: any;
    private descbkp: string = '';
    constructor(public viewCtrl: ViewController, public params: NavParams) {
        this.conta = params.get("parametro") || { descricao: "" }
        this.descbkp = this.conta.descricao;
    }

    ionViewDidLoad() {
        console.log('Hello ModalContasPage Page');
    }

    cancel() {
        this.conta.descricao = this.descbkp;
        this.viewCtrl.dismiss();
    }
    salvar() {
        this.viewCtrl.dismiss(this.conta);
    }

}
