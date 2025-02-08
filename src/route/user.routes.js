// // to learn flow till line no 7: 
// import { Router } from "express";
// import {registerUser} from '../controller/user.controller.js'

// const router=Router()
// router.route("/register").post(registerUser);
// export default router;

import { Router } from "express";
import {upload} from '../middlewares/multer.middleware.js'
import {registerUser} from '../controller/user.controller.js'
const router=Router()

router.route("/register").post(
    upload.fields([
        {name:"avtar" , maxCount:1} ,
        {name:"coverImg",maxCount:1}
    ]) ,
    registerUser
)


export default router

