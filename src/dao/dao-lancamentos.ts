import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import { Platform, Events } from 'ionic-angular';
import { DAOCommon } from './dao-common';


@Injectable()
export class DAOLancamentos extends DAOCommon {


    constructor(platform: Platform, public events: Events) {
        super(platform, events);
        //this.create_TBL();
    }

    create_TBL() {
        this.query('CREATE TABLE IF NOT EXISTS lancamentos(id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            'descricao TEXT, valor REAL, data INTEGER, conta TEXT, entradaSaida TEXT, pago INTEGER)').then(
            (succ) => console.log('Tabela "lancamentos" Criada'),
            (err) => this.errorcb(err, 'SQL criar tabela "lancamentos" não executado.')
            );
    }

    getList(dataInicio: Date, dataFim: Date, sucessCallBack) {
        //this.create_TBL();
        this.query('SELECT * FROM lancamentos WHERE data >= ? and data <= ?', [dataInicio.getTime(), dataFim.getTime()]).then((data) => {
            let list: any[] = [];
            for (let i = 0; i < data.res.rows.length; i++) {
                let lancamentoDB = data.res.rows.item(i);
                let item: any = {
                    id: lancamentoDB.id,
                    descricao: lancamentoDB.descricao,
                    valor: lancamentoDB.valor,
                    data: lancamentoDB.data,
                    conta: lancamentoDB.conta,
                    entradaSaida: lancamentoDB.entradaSaida,
                    pago: lancamentoDB.pago
                };
                list.push(item);
            }
            sucessCallBack(list);

        }, (err) => this.errorcb(err, 'Erro recuperando lançamentos.'));
    }

    insert(lancamento, sucessCallBack) {
        this.query('INSERT INTO lancamentos(descricao, valor, data, conta, entradaSaida, pago) ' +
            ' values (?, ?, ?, ?, ?, ?)', [lancamento.descricao, lancamento.valor,
            lancamento.data, lancamento.conta, lancamento.entradaSaida, lancamento.pago]).then((data) => {
                console.log(data);
                lancamento.id = data.res.insertId;
                sucessCallBack(lancamento);
                console.log('Gravou lançamento');
            }, (err) => this.errorcb(err, 'Erro inserindo lançamentos.'));
    }

    edit(lancamento, sucessCallBack) {
        this.query('UPDATE lancamentos SET descricao = ?,valor = ?, data = ?, conta = ?, ' +
            'entradaSaida = ?, pago = ? WHERE id = ?', [lancamento.descricao, lancamento.valor,
            lancamento.data, lancamento.conta, lancamento.entradaSaida, lancamento.pago, lancamento.id]).then((data) => {
                console.log(data);
                sucessCallBack(lancamento);
                console.log('Atualizou lançamento');
            }, (err) => this.errorcb(err, 'Erro atualizar lançamento.'));
    }

    delete(lancamento, sucessCallBack) {
        this.query('DELETE FROM lancamentos WHERE id = ?', [lancamento.id]).then((data) => {
            console.log(data);
            sucessCallBack(lancamento);
            console.log('Excluiu lançamento');
        }, (err) => this.errorcb(err, 'Erro excluir lançamento.'));
    }

    getSaldo(sucessCallBack) {
        this.query(`
              select ts.id, TOTAL(ts.entrada) as entrada, TOTAL(ts.saida) as saida from (
              SELECT 1 as id, TOTAL(valor) as entrada, 0 as saida FROM lancamentos
              where pago = 1 and entradaSaida = 'entrada'
              UNION
              SELECT 1 as id, 0 as entrada, TOTAL(valor) as saida FROM lancamentos
              where pago = 1 and entradaSaida = 'saida') AS ts
              GROUP BY ts.id
            `, []).then((data) => {
                let entrada = data.res.rows.item(0).entrada;
                let saida = data.res.rows.item(0).saida;
                let saldo = entrada - saida;
                sucessCallBack(saldo);
            }, (err) => this.errorcb(err, 'Erro consultar saldo.'));
    }

    getListGroupByContas(dataInicio: Date, dataFim: Date, entradaSaida, sucessCallBack) {
        this.query(`
              SELECT conta, TOTAL(valor) as saldoConta FROM lancamentos
              WHERE data >= ? and data <= ? and entradaSaida = ?
              and pago = 1
              GROUP BY conta
            `, [dataInicio.getTime(), dataFim.getTime(), entradaSaida]).then((data) => {
                let list: any[] = [];
                for (let i = 0; i < data.res.rows.length; i++) {
                    let item = data.res.rows.item(i);
                    let conta: any = {
                        conta: item.conta,
                        saldo: item.saldoConta,
                        percentual: 0
                    };
                    list.push(conta);

                }
                sucessCallBack(list);
            }, (err) => this.errorcb(err, 'Erro consultar saldo.'));
    }
}
