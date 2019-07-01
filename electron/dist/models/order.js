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
var typeorm_1 = require("typeorm");
var customer_1 = require("./customer");
var article_1 = require("./article");
var collections_1 = require("@everest/collections");
var Order = /** @class */ (function () {
    function Order() {
    }
    Object.defineProperty(Order.prototype, "payment", {
        get: function () {
            return this._payment;
        },
        set: function (value) {
            this._payment = value;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Order.prototype, "id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Order.prototype, "registrationDate", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Order.prototype, "price", void 0);
    __decorate([
        typeorm_1.Column({ name: 'payment' }),
        __metadata("design:type", Number)
    ], Order.prototype, "_payment", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return customer_1.Customer; }, function (customer) { return customer.orders; }),
        __metadata("design:type", customer_1.Customer)
    ], Order.prototype, "customer", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return OrderItem; }, function (orderItem) { return orderItem.order; }, { cascade: true }),
        __metadata("design:type", collections_1.List)
    ], Order.prototype, "orderItems", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Payment; }, function (payment) { return payment.order; }, { cascade: true }),
        __metadata("design:type", Order)
    ], Order.prototype, "payments", void 0);
    Order = __decorate([
        typeorm_1.Entity()
    ], Order);
    return Order;
}());
exports.Order = Order;
var OrderItem = /** @class */ (function () {
    function OrderItem() {
    }
    Object.defineProperty(OrderItem.prototype, "quantity", {
        get: function () {
            return this._quantity;
        },
        set: function (value) {
            this._quantity = value;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], OrderItem.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Order; }, function (order) { return order.orderItems; }),
        __metadata("design:type", Order)
    ], OrderItem.prototype, "order", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return article_1.Article; }, function (article) { return article.orderItems; }),
        __metadata("design:type", article_1.Article)
    ], OrderItem.prototype, "article", void 0);
    __decorate([
        typeorm_1.Column({ name: 'quantity' }),
        __metadata("design:type", Number)
    ], OrderItem.prototype, "_quantity", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], OrderItem.prototype, "price", void 0);
    OrderItem = __decorate([
        typeorm_1.Entity()
    ], OrderItem);
    return OrderItem;
}());
exports.OrderItem = OrderItem;
var Payment = /** @class */ (function () {
    function Payment() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Payment.prototype, "id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Payment.prototype, "registrationDate", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Payment.prototype, "amount", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Order; }, function (order) { return order.payments; }),
        __metadata("design:type", Order)
    ], Payment.prototype, "order", void 0);
    Payment = __decorate([
        typeorm_1.Entity()
    ], Payment);
    return Payment;
}());
exports.Payment = Payment;
//# sourceMappingURL=order.js.map