import { Router } from "express";
import { BlockReportedPost, DeleteHashTag, HashTagManagement, ReportManageMent, UnBlockReportedPost, adminLogin } from "../Controllers/adminController";
import { BloackUser, UnBloackUser, UserManagement } from "../Controllers/userController";
import { AddHashTag } from "../Controllers/adminController";




const router = Router();


router.get('/UserManageMent/Users', UserManagement);
router.get('/HashTagManageMent', HashTagManagement);
router.get('/ReportManageMent',ReportManageMent);

router.post('/login', adminLogin);
router.post('/UserManageMent/UnBloack/:email', UnBloackUser)
router.post('/UserManageMent/Block/:email', BloackUser)
router.post('/AddHashtag',AddHashTag);
router.post('/AddHashtag/Delete/:HashTagId',DeleteHashTag);
router.post ('/BlockReportedPost/:PostId',BlockReportedPost);
router.post ('/UnBlockReportedPost/:PostId',UnBlockReportedPost);


export default router