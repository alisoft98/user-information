import BaseResponse from "./base_response"

class Forbidden extends BaseResponse {
    constructor(messsage: string) {
        super(messsage, 403)
        Object.setPrototypeOf(this, Forbidden.prototype);
    }
}

export default Forbidden;