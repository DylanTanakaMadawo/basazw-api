import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import {
  test,
  registerUser,
  loginUser,
  getProfile,
} from "../Controllers/authController.js";

const router = express.Router();
// const app = express();
// router.use(cors());
router.use(cookieParser());
router.use(
  cors({
    credentials: true,
    origin: "https://basazw.onrender.com/",
    // origin: "http://localhost:3000",
    // optionsSuccessStatus: 200,
  })
);

router.get("/", test);
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);

export default router;
