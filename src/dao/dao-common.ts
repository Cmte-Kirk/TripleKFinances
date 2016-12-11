import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import { Platform, Events } from 'ionic-angular';

const DB_NAME: string = 'data.db';
const win: any = window;

@Injectable()
export abstract class DAOCommon {

    private _txt_sorageAberto = 'Storage foi aberto.';
    private _txt_sorageNaoAberto = 'Storage não pode ser aberto.';
    protected db: any;
    protected isOpen: boolean = false;
    protected isDevice: boolean = false;

    //abstract getList(sucessCallBack);
    abstract insert(classe: any, sucessCallBack);
    abstract edit(classe: any, sucessCallBack);
    protected abstract create_TBL();

    constructor(private platform: Platform, public events: Events) {
        // this.platform.ready().then(() => {
        //     if (this.platform._platforms[0] == 'cordova') {
        //         this.db = win.sqlitePlugin.openDatabase({ name: DB_NAME, location: "default" });
        //     } else {
        //         this.db = win.openDatabase(DB_NAME, "1", "data", 1024 * 1024 * 100);
        //         this.isOpen = true;
        //     }
        //     //disparar um evento aqui para ser usado na construção da tabela
        // });
        this.initDB();
    }

    initDB() {
        this.platform.ready().then(() => {
            if (this.platform._platforms[0] == 'cordova') {
                //let db = new SQLite();
                //this.db = db.openDatabase({ name: DB_NAME, location: "default" });
                this.db = win.sqlitePlugin.openDatabase({ name: DB_NAME, location: "default" });
                //this.isDevice = true;
            } else {
                this.db = win.openDatabase(DB_NAME, "1", "data", 1024 * 1024 * 100);
                this.isOpen = true;
                this.isDevice = false;
            }
            this.create_TBL();
            this.events.publish('dao:ready', this.db);
            //disparar um evento aqui para ser usado na construção da tabela
        });
    }
    protected query(query: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                console.log('query...: ' + query);
                console.log(this.db);
                this.db.transaction((tx: any) => {
                    tx.executeSql(query, params,
                        (tx: any, res: any) => resolve({ tx: tx, res: res }),
                        (tx: any, err: any) => reject({ tx: tx, err: err }));
                },
                    (err: any) => reject({ err: err }));
            } catch (err) {
                reject({ err: err });
            }
        });
    }

    protected errorcb(err: any, text: string): void {
        console.log(text + ': ' + err.message);
        console.log(err);
    }

}
