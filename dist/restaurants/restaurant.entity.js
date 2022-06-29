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
exports.Restaurant = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let Restaurant = class Restaurant {
};
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Restaurant.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurant.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurant.prototype, "mail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurant.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Restaurant.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Restaurant.prototype, "updatedAt", void 0);
Restaurant = __decorate([
    (0, typeorm_1.Entity)()
], Restaurant);
exports.Restaurant = Restaurant;
//# sourceMappingURL=restaurant.entity.js.map