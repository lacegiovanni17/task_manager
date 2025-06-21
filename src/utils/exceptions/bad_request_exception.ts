import HttpException from "./http_exception";

/**
 * InternalException is a custom exception class that extends HttpException.
 * It is used to represent internal server errors (HTTP status code 500).
 */
export class BadRequestException extends HttpException {
    /**
     * Constructs a BadRequestException with a default message and status code.
     * @param message - The error message (optional).
     */
    constructor(message: string = "Bad request") {
        super(400, message);
        this.name = "BadRequestException";
    }
}

export default BadRequestException;