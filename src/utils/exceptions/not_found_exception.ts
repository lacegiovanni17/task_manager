import HttpException from "./http_exception";

/**
 * InternalException is a custom exception class that extends HttpException.
 * It is used to represent internal server errors (HTTP status code 500).
 */

export class NotFoundException extends HttpException {
    /**
     * Constructs a NotFoundException with a default message and status code.
     * @param message - The error message (optional).
     */
    constructor(message: string = "Resource not found") {
        super(404, message);
    }
}