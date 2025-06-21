import HttpException from "./http_exception";

/**
 * InternalException is a custom exception class that extends HttpException.
 * It is used to represent internal server errors (HTTP status code 500).
 */
export class InternalException extends HttpException {
    /**
     * Constructs a new InternalException.
     * @param message - The error message to be displayed.
     */
    constructor(message: string) {
        super(500, message);
        this.name = "InternalException";
    }
}


export default InternalException;