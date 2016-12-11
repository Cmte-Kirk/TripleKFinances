import { Component } from '@angular/core';
import { ModalController, AlertController } from 'ionic-angular';
import { DAOContas } from '../../dao/dao-contas';
import { ModalContasPage } from '../modal-contas/modal-contas';
import { Toast } from 'ionic-native';

@Component({
    selector: 'page-contas',
    templateUrl: 'contas.html'
})
export class ContasPage {


    public listContas: any[];

    constructor(public modalCtrl: ModalController, public alertCtrl: AlertController, private dao: DAOContas) {
        //this.dao = new DAOContas();
    }

    ionViewDidLoad() {
        console.log('Hello ContasPage Page');
    }
    ionViewDidEnter() {
        console.log('Hello ContasPage ionViewDidEnter');
        this.dao.getList((lista) => {
            this.listContas = lista;
        });
    }

    insert() {
        let modal = this.modalCtrl.create(ModalContasPage);
        modal.onDidDismiss(data => this.getData(data, false));
        modal.present();
    }

    edit(conta) {
        let modal = this.modalCtrl.create(ModalContasPage, { parametro: conta });
        modal.onDidDismiss(data => this.getData(data, true));
        modal.present();
    }

    delete(conta) {
        let confirm = this.alertCtrl.create({
            title: 'Excluir',
            message: 'Gostaria realmente de excluir a conta: ' + conta.descricao + '?',
            buttons: [{
                text: 'Sim', handler: () => {
                    this.deleteConta(conta);
                }
            }, { text: 'Não' }]
        });
        confirm.present();
    }
    private deleteConta(conta) {
        this.dao.delete(conta, (data) => {
            let pos = this.listContas.indexOf(conta);
            this.listContas.splice(pos, 1);
            Toast.showShortBottom('Conta excluída com sucesso').subscribe((toast) => {
                console.log(toast);
            })
        });
    }
    private getData(data, edit: boolean): void {
        console.log(data);

        if (!(data == null)) {
            if (edit)
                this.dao.edit(data, (conta) => {
                    // faz nada
                    Toast.showShortBottom('Conta alterada com sucesso').subscribe((toast) => {
                        console.log(toast);
                    })
                });
            else
                this.dao.insert(data, (conta) => {
                    this.listContas.push(conta);
                    Toast.showShortBottom('Conta inserida com sucesso').subscribe((toast) => {
                        console.log(toast);
                    })
                });
        }
    }
}
