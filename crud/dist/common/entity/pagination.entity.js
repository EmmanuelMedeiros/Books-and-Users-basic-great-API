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
exports.Pagination = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class Pagination {
    constructor(limit, offset, urlSuffix, numberOfElements) {
        this.limit = Number(limit),
            this.offset = Number(offset),
            this.urlSuffix = urlSuffix,
            this.numberOfElements = Number(numberOfElements);
    }
    firstPage() {
        return `http://localhost:3000/${this.urlSuffix}?limit=${this.limit}&offset=0`;
    }
    previousPage() {
        const previousOffset = this.offset - this.limit;
        if (previousOffset < 0) {
            return null;
        }
        ;
        return `http://localhost:3000/${this.urlSuffix}?limit=${this.limit}&offset=${previousOffset}`;
    }
    ;
    nextPage() {
        const nextOffset = this.offset + this.limit;
        const totalNumberOfPages = Math.ceil(this.numberOfElements / this.limit);
        if (this.offset !== 0 && (this.offset / this.limit + 1) >= totalNumberOfPages) {
            return null;
        }
        ;
        return `http://localhost:3000/${this.urlSuffix}?limit=${this.limit}&offset=${nextOffset}`;
    }
    ;
    lastPage() {
        const totalNumberOfPages = Math.ceil(this.numberOfElements / this.limit);
        const lastOffset = (this.limit * totalNumberOfPages) - this.limit;
        return `http://localhost:3000/${this.urlSuffix}?limit=${this.limit}&offset=${lastOffset}`;
    }
}
exports.Pagination = Pagination;
__decorate([
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], Pagination.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], Pagination.prototype, "offset", void 0);
//# sourceMappingURL=pagination.entity.js.map