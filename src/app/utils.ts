export class Utils {

    //  public static clone(): any {
    //     var cloneObj = new (<any>this.constructor());
    //     for (var attribut in this) {
    //         if (typeof this[attribut] === "object") {
    //             cloneObj[attribut] = this.clone();
    //         } else {
    //             cloneObj[attribut] = this[attribut];
    //         }
    //     }
    //     return cloneObj;
    // }

    public static clone(obj: any): any {
        var cloneObj = new (<any>obj.constructor());
        for (var attribut in obj) {
            if (typeof obj[attribut] === "object") {
                cloneObj[attribut] = Utils.clone(obj[attribut]);
            } else {
                cloneObj[attribut] = obj[attribut];
            }
        }
        return cloneObj;
    }

    public static copy(src: any, target: any) {
        for (var attribut in src) {
            if (typeof src[attribut] === "object") {
                Utils.copy(src[attribut], target[attribut]);
            } else {
                target[attribut] = src[attribut];
            }
        }
    }

    public static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    public static parseDate(date: string) {
        let parts = date.split("-");
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    }

    public static parseString(date) {
        return new Date(date).toLocaleDateString();
    }

    public static formatDate(dateMiliseconds) {
        let data = new Date(dateMiliseconds);
        let inicio = '00';

        let ano = data.getFullYear();
        let mes = (inicio + (data.getMonth() + 1)).slice(-2);
        let dia = (inicio + data.getDate()).slice(-2);

        return (ano + '-' + mes + '-' + dia);
    }

    public static getMonthName(date: Date) {
        //let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let options = { month: 'long' };
        let mes = Utils.capitalizeFirstLetter(date.toLocaleDateString('pt-BR', options));
        return mes;
    }

    public static getFirstDay(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }
    
    public static getLastDay(date: Date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }
}
