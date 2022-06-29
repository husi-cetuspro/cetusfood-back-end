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
exports.RestaurantsController = void 0;
const common_1 = require("@nestjs/common");
const restaurant_entity_1 = require("./restaurant.entity");
const restaurants_service_1 = require("./restaurants.service");
const swagger_1 = require("@nestjs/swagger");
let RestaurantsController = class RestaurantsController {
    constructor(restaurantService) {
        this.restaurantService = restaurantService;
    }
    async getAll() {
        return await this.restaurantService.getAll();
    }
    async getById(id) {
        return await this.restaurantService.getById(id);
    }
    async add(restaurant) {
        return await this.restaurantService.add(restaurant);
    }
    async edit(id, restaurant) {
        return await this.restaurantService.edit(id, restaurant);
    }
    async delete(id) {
        return await this.restaurantService.delete(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Zwraca liste wszystkich restauracji w bazie danych" }),
    (0, swagger_1.ApiOkResponse)({ description: "Wszystkie restauracje w bazie danych", type: restaurant_entity_1.Restaurant, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: "Zwraca restauracje o podanym id, w przypadku niepoprawnego id zwraca null" }),
    (0, swagger_1.ApiOkResponse)({ description: "Restauracja o podanym id lub null", type: restaurant_entity_1.Restaurant, isArray: false }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({ summary: "Dodaje restaurację do bazy danych" }),
    (0, swagger_1.ApiOkResponse)({ description: "Obiekt, ktory został dodany do bazy danych", type: restaurant_entity_1.Restaurant, isArray: false }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [restaurant_entity_1.Restaurant]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "add", null);
__decorate([
    (0, common_1.Post)(':id'),
    (0, swagger_1.ApiOperation)({ summary: "Edytuje restaurację o podanym id" }),
    (0, swagger_1.ApiOkResponse)({ schema: {
            type: 'object',
            properties: {
                affected: { type: 'number', description: 'Liczba zedytowanych restauracji' },
            }
        } }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, restaurant_entity_1.Restaurant]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "edit", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: "Usuwa restaurację o podanym id" }),
    (0, swagger_1.ApiOkResponse)({ schema: {
            type: 'object',
            properties: {
                affected: { type: 'number', description: 'Liczba usuniętych restauracji' },
            }
        } }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "delete", null);
RestaurantsController = __decorate([
    (0, swagger_1.ApiTags)('restaurants'),
    (0, common_1.Controller)('restaurants'),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantsService])
], RestaurantsController);
exports.RestaurantsController = RestaurantsController;
//# sourceMappingURL=restaurants.controller.js.map