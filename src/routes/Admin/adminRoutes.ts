import { Router } from "express";
import { AdminController } from "../../controllers/adminController";
import validator from "../../helpers/validator";
import schema from './schema';
import { END_POINT } from '../../constants/endPoints';
export class AdminRoute extends AdminController {
    constructor(router: Router) {
        super();
        this.route(router);
    }

    public route(router: Router) {
        router.post(END_POINT.GET_ALL_ADMINS, this.getAllAdmins);
        router.post(END_POINT.ADD_ADMIN, validator(schema.addAdminSchema), this.addAdmin);
        router.get(END_POINT.GET_ADMIN_BY_ID, this.getAdmin);
    }
}
