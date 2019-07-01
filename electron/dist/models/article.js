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
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var order_1 = require("./order");
var reception_1 = require("./reception");
var Article = /** @class */ (function () {
    function Article() {
    }
    Object.defineProperty(Article.prototype, "totalBuyingPrice", {
        /**
         * Le prix d'achat total.
         */
        get: function () {
            return this.buyingPrice * this.quantity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Article.prototype, "totalSellingPrice", {
        /**
         * Le prix de vente total.
         */
        get: function () {
            return this.sellingPrice * this.quantity;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Article.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsNotEmpty(),
        class_validator_1.MinLength(3),
        class_validator_1.Matches(/^[0-9a-zàâçéèêëîïôûùüÿñæœ .-]*$/i, { message: 'Contient des caractères non autorisés' }),
        __metadata("design:type", String)
    ], Article.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsNotEmpty(),
        class_validator_1.MinLength(3),
        class_validator_1.Matches(/^[0-9a-z .-]*$/i),
        __metadata("design:type", String)
    ], Article.prototype, "reference", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsNumber(),
        class_validator_1.Min(0),
        __metadata("design:type", Number)
    ], Article.prototype, "quantity", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsNumber(),
        class_validator_1.Min(0),
        __metadata("design:type", Number)
    ], Article.prototype, "buyingPrice", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsNumber(),
        class_validator_1.Min(0),
        __metadata("design:type", Number)
    ], Article.prototype, "sellingPrice", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return order_1.OrderItem; }, function (orderItem) { return orderItem.article; }),
        __metadata("design:type", Array)
    ], Article.prototype, "orderItems", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return reception_1.ReceptionItem; }, function (receptionItem) { return receptionItem.article; }),
        __metadata("design:type", Array)
    ], Article.prototype, "receptionItems", void 0);
    Article = __decorate([
        typeorm_1.Entity()
    ], Article);
    return Article;
}());
exports.Article = Article;
//# sourceMappingURL=article.js.map