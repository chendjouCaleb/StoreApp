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
Object.defineProperty(exports, "__esModule", { value: true });
var article_1 = require("./article");
var typeorm_1 = require("typeorm");
var Reception = /** @class */ (function () {
    function Reception() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Reception.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Reception.prototype, "providerName", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Reception.prototype, "billId", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Reception.prototype, "registrationDate", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return ReceptionItem; }, function (receptionItem) { return receptionItem.reception; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Reception.prototype, "items", void 0);
    Reception = __decorate([
        typeorm_1.Entity()
    ], Reception);
    return Reception;
}());
exports.Reception = Reception;
var ReceptionItem = /** @class */ (function () {
    function ReceptionItem() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], ReceptionItem.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], ReceptionItem.prototype, "quantity", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], ReceptionItem.prototype, "price", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return article_1.Article; }, function (article) { return article.receptionItems; }),
        __metadata("design:type", article_1.Article)
    ], ReceptionItem.prototype, "article", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Reception; }, function (reception) { return reception.items; }),
        __metadata("design:type", Reception)
    ], ReceptionItem.prototype, "reception", void 0);
    ReceptionItem = __decorate([
        typeorm_1.Entity()
    ], ReceptionItem);
    return ReceptionItem;
}());
exports.ReceptionItem = ReceptionItem;
//# sourceMappingURL=reception.js.map