import { Router } from "express";
import * as mov from "./requestHandler.js";

const router=Router();
router.route("/addmovie").post(mov.addMovie);

export default router;