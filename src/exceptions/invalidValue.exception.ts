import {HttpException, HttpStatus} from "@nestjs/common";

export class InvalidValueException extends HttpException{
    constructor() {
        super('Invalid Value', HttpStatus.BAD_REQUEST);
    }
}