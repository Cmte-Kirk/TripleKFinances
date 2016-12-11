import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import { Platform, Events } from 'ionic-angular';
import { DAOCommon } from './dao-common';

@Injectable()
export class DAOContas extends DAOCommon {


    constructor(platform: Platform, public events: Events) {
        super(platform, events);
        //this.create_TBL();
    }


    create_TBL() {
        this.query('CREATE TABLE IF NOT EXISTS contas(id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT)').then(
            (succ) => console.log('Tabela "contas" Criada'),
            (err) => this.errorcb(err, 'SQL criar tabela "contas" não executado.')
        );
    }

    getList(sucessCallBack) {
        //this.create_TBL();
        this.query('SELECT * FROM contas').then((data) => {
            let list = [];
            for (let i = 0; i < data.res.rows.length; i++) {
                let item: any = {};
                item.id = data.res.rows.item(i).id;
                item.descricao = data.res.rows.item(i).descricao;
                list.push(item)
            }
            sucessCallBack(list);

        }, (err) => this.errorcb(err, 'Erro recuperando contas.'));
    }

    insert(conta, sucessCallBack) {
        this.query('INSERT INTO contas(descricao) values (?)', [conta.descricao]).then((data) => {
            console.log(data);
            conta.id = data.res.insertId;
            sucessCallBack(conta);
            console.log('Gravou conta');
        }, (err) => this.errorcb(err, 'Erro inserindo contas.'));
    }

    edit(conta, sucessCallBack) {
        this.query('UPDATE contas SET descricao = ? WHERE id = ?', [conta.descricao, conta.id]).then((data) => {
            console.log(data);
            sucessCallBack(conta);
            console.log('Atualizou conta');
        }, (err) => this.errorcb(err, 'Erro atualizar contas.'));
    }

    delete(conta, sucessCallBack) {
        this.query('DELETE FROM contas WHERE id = ?', [conta.id]).then((data) => {
            console.log(data);
            sucessCallBack(conta);
            console.log('Excluiu conta');
        }, (err) => this.errorcb(err, 'Erro excluir contas.'));
    }

}
