import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Utils } from '../app/utils';

@Component({
    selector: "date-filter",
    //inputs: ['startDate'],
    template: `
  <ion-row>
    <ion-col width-25>
      <button ion-button color="favorite" clear round (click)="previousMonth()"><ion-icon name="arrow-dropleft-circle"></ion-icon></button>
    </ion-col>
    <ion-col (click)="executeClickMonth()">
      <h5 class="texto-destaque" color="favorite" >{{this.mesSelecionado}}</h5>
    </ion-col>
    <ion-col width-25>
      <button ion-button color="favorite" clear round (click)="nextMonth()"><ion-icon name="arrow-dropright-circle"></ion-icon></button>
    </ion-col>
  </ion-row>
  `

})

export class DateFilter {
    @Input('start-date') public dt: Date;
    @Output('changeMonth') public changeMonth;
    @Output('clickMonth') public clickMonth;

    public mesSelecionado: string;
    //public startDate: Date = new Date(200,1,1);

    constructor() {
        this.changeMonth = new EventEmitter();
        this.clickMonth = new EventEmitter();
    }
    private _updateMonth() {
        let ano = this.dt.getFullYear();
        this.mesSelecionado = Utils.getMonthName(this.dt) + ' - ' + ano;
        this._executeChangeMonth();
    }
    private _executeChangeMonth() {
        this.changeMonth.emit(this.dt);
    }

    // evento que é disparado quando o controle está pronto
    ngOnInit() {
        this._updateMonth();
    }

    // Evento que monitora alterações nos @inputs
    ngOnChanges(changes) {
      console.log("Atualizou date-filter");
      this._updateMonth();
    }

    previousMonth() {
        this.dt.setMonth(this.dt.getMonth() - 1);
        this._updateMonth()
    }
    nextMonth() {
        this.dt.setMonth(this.dt.getMonth() + 1);
        this._updateMonth()
    }
    executeClickMonth(){
      this.clickMonth.emit();
    }
}
