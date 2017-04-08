/*
  This file defines a service for manipulating the Excelspreadsheet. 
*/

/// <reference path="../../../typings/index.d.ts" />

import { Injectable } from '@angular/core';
import { AthenaApiService } from '../athena-api/athena.api.service';

@Injectable()
export class ExcelSpreadsheetService {

    constructor(private api: AthenaApiService) {
    }

    private header: any;

    addValue(context: Excel.RequestContext, value: any, column: number, row: number, color: string) {
        let worksheet: Excel.Worksheet = context.workbook.worksheets.getActiveWorksheet();
        let cell: Excel.Range = worksheet.getCell(row, column);
        cell.values = [[value]];

        if (color != null && color != "") {
            cell.format.fill.color = color;
            cell.format.protection.locked = true;
        }

    }

    setTable(column: number, row: number) {

    }

    addApiData(value: string) {
        this.api.describe(value).subscribe(
            data => this.storeHeader(data.json(), value)

        );

    }

    storeHeader(data: any, value: string) {
        let app: ExcelSpreadsheetService = this;
        Excel.run(function (context) {
            app.addValue(context, value, 0, 0, "orange");
            return context.sync();
        }).catch(this.errorHandler);

        this.header = data;
        this.api.list(value).subscribe(
            data => this.pushToExcel(data.json())

        );
    }

    pushToExcel(data: any) {
        let headers: any = this.header;
        let app: ExcelSpreadsheetService = this;

        Excel.run(function (context) {
            let x: number = 0; //Column
            let y: number = 1; //Row
            for (let entry of headers) {
                app.addValue(context, entry.fieldName, x, y, "orange");
                app.addValue(context, entry.label, x, y + 1, "orange");
                x = x + 1;
            }
            return context.sync();
        }).catch(app.errorHandler);

        Excel.run(function (context) {
            let colnumber: number = 0;
            let rownumber: number = 3;
            for (let row of data) {
                for (let col of headers) {
                    app.addValue(context, app.toObject(row[app.toCamel(col.propertyName)]), colnumber, rownumber, "");
                    colnumber = colnumber + 1;
                }
                colnumber = 0;
                rownumber = rownumber + 1;
            }

            return context.sync();
        }).catch(app.errorHandler);
    }

    toObject(value: any): any {

        if (value == null) {
            return null;
        }
        if (typeof value == "number") {
            let newValue: number = value;
            return newValue;
        }
        if (typeof value == "boolean") {
            let newValue: boolean = value;
            return newValue;
        }
        if (typeof value == "object") {
            return value.id;
        }
        if (typeof value == "string") {
            if (value.length < 50) {
                try {
                    var timestamp = Date.parse(value)

                    if (isNaN(timestamp) == false) {
                        var d = new Date(timestamp);
                        return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
                    }
                }
                catch (ex) {
                    console.log(ex);
                }
            }
            if (value.length < 256) {
                let sValue: string = value;
                return sValue;
            }
            else {
                return "";
            }
        }

        return value;
    }

    toCamel(value: string): string {
        if (value === "ID") {
            return "id";
        }
        else if (value != "") {
            return value.charAt(0).toLowerCase() + value.slice(1);;
        }
        else {
            return "";
        }

    }

    errorHandler(error: any) {
        console.log("Error: " + error);
        if (error instanceof OfficeExtension.Error) {
            console.log("Debug info: " + JSON.stringify(error.debugInfo));
        }
    }
}