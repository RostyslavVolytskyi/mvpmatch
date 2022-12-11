import { CustomError } from "./custom-error";

export class AuthFailedError extends CustomError {
    statusCode = 403;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, AuthFailedError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}
