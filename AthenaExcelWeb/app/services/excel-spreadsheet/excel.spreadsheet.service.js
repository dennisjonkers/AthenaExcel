/*
  This file defines a service for manipulating the Excelspreadsheet.
*/
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../../typings/index.d.ts" />
var core_1 = require('@angular/core');
var athena_api_service_1 = require('../athena-api/athena.api.service');
var ExcelSpreadsheetService = (function () {
    function ExcelSpreadsheetService(api) {
        this.api = api;
    }
    ExcelSpreadsheetService.prototype.addValue = function (context, value, column, row, color) {
        var worksheet = context.workbook.worksheets.getActiveWorksheet();
        var cell = worksheet.getCell(row, column);
        cell.values = [[value]];
        if (color != null && color != "") {
            cell.format.fill.color = color;
            cell.format.protection.locked = true;
        }
    };
    ExcelSpreadsheetService.prototype.setTable = function (column, row) {
    };
    ExcelSpreadsheetService.prototype.addApiData = function (value) {
        var _this = this;
        this.api.describe(value).subscribe(function (data) { return _this.storeHeader(data.json(), value); });
    };
    ExcelSpreadsheetService.prototype.storeHeader = function (data, value) {
        var _this = this;
        var app = this;
        Excel.run(function (context) {
            app.addValue(context, value, 0, 0, "orange");
            return context.sync();
        }).catch(this.errorHandler);
        this.header = data;
        this.api.list(value).subscribe(function (data) { return _this.pushToExcel(data.json()); });
    };
    ExcelSpreadsheetService.prototype.pushToExcel = function (data) {
        var headers = this.header;
        var app = this;
        Excel.run(function (context) {
            var x = 0; //Column
            var y = 1; //Row
            for (var _i = 0, headers_1 = headers; _i < headers_1.length; _i++) {
                var entry = headers_1[_i];
                app.addValue(context, entry.fieldName, x, y, "orange");
                app.addValue(context, entry.label, x, y + 1, "orange");
                x = x + 1;
            }
            return context.sync();
        }).catch(app.errorHandler);
        Excel.run(function (context) {
            var colnumber = 0;
            var rownumber = 3;
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var row = data_1[_i];
                for (var _a = 0, headers_2 = headers; _a < headers_2.length; _a++) {
                    var col = headers_2[_a];
                    app.addValue(context, app.toObject(row[app.toCamel(col.propertyName)]), colnumber, rownumber, "");
                    colnumber = colnumber + 1;
                }
                colnumber = 0;
                rownumber = rownumber + 1;
            }
            return context.sync();
        }).catch(app.errorHandler);
    };
    ExcelSpreadsheetService.prototype.toObject = function (value) {
        if (value == null) {
            return null;
        }
        if (typeof value == "number") {
            var newValue = value;
            return newValue;
        }
        if (typeof value == "boolean") {
            var newValue = value;
            return newValue;
        }
        if (typeof value == "object") {
            return value.id;
        }
        if (typeof value == "string") {
            if (value.length < 50) {
                try {
                    var timestamp = Date.parse(value);
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
                var sValue = value;
                return sValue;
            }
            else {
                return "";
            }
        }
        return value;
    };
    ExcelSpreadsheetService.prototype.toCamel = function (value) {
        if (value === "ID") {
            return "id";
        }
        else if (value != "") {
            return value.charAt(0).toLowerCase() + value.slice(1);
            ;
        }
        else {
            return "";
        }
    };
    ExcelSpreadsheetService.prototype.errorHandler = function (error) {
        console.log("Error: " + error);
        if (error instanceof OfficeExtension.Error) {
            console.log("Debug info: " + JSON.stringify(error.debugInfo));
        }
    };
    ExcelSpreadsheetService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [athena_api_service_1.AthenaApiService])
    ], ExcelSpreadsheetService);
    return ExcelSpreadsheetService;
}());
exports.ExcelSpreadsheetService = ExcelSpreadsheetService;
//# sourceMappingURL=excel.spreadsheet.service.js.map