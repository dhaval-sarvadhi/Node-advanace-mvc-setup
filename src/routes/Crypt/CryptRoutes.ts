import { Router } from "express";
import { END_POINT } from "../../constants/endPoints";
import { CryptController } from "../../controllers/cryptController";

export class CryptRoute extends CryptController {
    constructor(router: Router) {
        super();
        this.route(router);
    }

    public route(router: Router) {
        router.post(END_POINT.ENC, this.goEncrypt); // now this.checkHealth is correctly typed
        router.post(END_POINT.DEC, this.goDecrypt); // now this.checkHealth is correctly typed
    }
}
