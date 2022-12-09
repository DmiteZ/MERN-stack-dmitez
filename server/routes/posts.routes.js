import {Router} from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPost,
} from "../controllers/posts.controllers.js";

const router = Router();

//Para obtener publicaciones
router.get("/posts", getPosts); //lista de muchas publicaciones

//post: para crear publicaciones
router.post("/posts", createPost);

//put: para actualizar publicaciones
router.put("/posts/:id", updatePost);

//delete: para eliminar publicaciones
router.delete("/posts/:id", deletePost);

//para poder obtener una sola publicación
router.get("/posts/:id", getPost);

export default router;
