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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_entity_1 = require("./orders.entity");
const orders_service_1 = require("./orders.service");
const swagger_1 = require("@nestjs/swagger");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async add(Order) {
        return await this.ordersService.add(Order);
    }
};
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({ summary: "Dodaje zamowienie do bazy danych" }),
    (0, swagger_1.ApiOkResponse)({ description: "Zamowienie, ktore został dodany do bazy danych", type: orders_entity_1.Order, isArray: false }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [orders_entity_1.Order]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "add", null);
OrdersController = __decorate([
    (0, swagger_1.ApiTags)('order'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
exports.OrdersController = OrdersController;
//# sourceMappingURL=orders.controller.js.map