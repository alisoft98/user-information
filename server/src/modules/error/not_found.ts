import BaseResponse from "./base_response";

class NotFound extends BaseResponse {
    constructor(message: string) {
        super(message, 404);
        Object.setPrototypeOf(this, NotFound.prototype)
    }
}
export default NotFound;