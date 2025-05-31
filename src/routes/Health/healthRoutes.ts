import { Router } from "express";
import { HealthController } from "../../controllers/healthController";
import { END_POINT } from "../../constants/endPoints";

export class HealthRoute extends HealthController {
    constructor(router: Router) {
        super();
        this.route(router);
    }

    public route(router: Router) {
        router.get(END_POINT.HEALTH, this.checkHealth); // now this.checkHealth is correctly typed
    }
}
