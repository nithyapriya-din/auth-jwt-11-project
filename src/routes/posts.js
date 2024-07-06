import { Router } from "express";
import { auth } from "../middleware/validateToken.js";

export const router = Router();

router.get("/", auth, (req, res) => {
  res.json({
    posts: {
      title: "my first post",
      description: "sample data",
    },
  });
  res.send(req.user);
});
