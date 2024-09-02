import { Router } from "express";
import { createComment, deleteComment, getComment, getThisComment, updeteComment } from "../controllers/comments.mjs";
const commentsRoutes = Router();
commentsRoutes.get("/", getComment);
commentsRoutes.get("/this", getThisComment);
commentsRoutes.post("/create", createComment);
commentsRoutes.put("/updete", updeteComment);
commentsRoutes.delete("/delete", deleteComment);
export default commentsRoutes;
