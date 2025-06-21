import HttpException from './http_exception';

export class UnauthorizedException extends HttpException {
    constructor(message: string) {
        super(401, message);
    }
}