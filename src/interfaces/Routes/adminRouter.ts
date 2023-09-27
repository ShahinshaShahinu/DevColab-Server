import { Router } from "express";
import { BlockReportedPost, DashbordDAta, DeleteHashTag, HashTagManagement, ReportManageMent, UnBlockReportedPost, adminLogin, clearAllReportPosts } from "../Controllers/adminController";
import { BloackUser, UnBloackUser, UserManagement } from "../Controllers/userController";
import { AddHashTag } from "../Controllers/adminController";
import { adminAuth } from "../MiddleWares/adminAuth";




const router = Router();


router.get('/UserManageMent/Users',adminAuth, UserManagement);
router.get('/HashTagManageMent',adminAuth, HashTagManagement);
router.get('/ReportManageMent',adminAuth,ReportManageMent);
router.get('/DashbordDAta',adminAuth,DashbordDAta)

router.post('/login', adminLogin);
router.post('/UserManageMent/UnBloack/:email', UnBloackUser)
router.post('/UserManageMent/Block/:email', BloackUser)
router.post('/AddHashtag',AddHashTag);
router.post('/AddHashtag/Delete/:HashTagId',DeleteHashTag);
router.post ('/BlockReportedPost/:PostId',BlockReportedPost);
router.post ('/UnBlockReportedPost/:PostId',UnBlockReportedPost);
router.post('/clearReportPosts',clearAllReportPosts)

export default router