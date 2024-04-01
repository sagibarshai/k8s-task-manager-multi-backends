import { Router } from "express";
import { currentUserMiddleWear } from "../../middlewares/current-user";
import { body } from "express-validator";
import { createTaskController, deleteTaskController, getTaskController, updateTaskController } from "../../controllers/task";

const router = Router();

// Create task
router.post(
  "/",
  currentUserMiddleWear,
  body("title").isLength({ min: 2 }).withMessage("Title must be valid"),
  body("content").isLength({ min: 2 }).withMessage("Content must be valid"),
  createTaskController
);
//

// Update task
router.put(
  "/:id",
  currentUserMiddleWear,
  body("title").isLength({ min: 2 }).withMessage("Title must be valid"),
  body("content").isLength({ min: 2 }).withMessage("Content must be valid"),
  updateTaskController
);
//

// Read tasks
router.get("/", currentUserMiddleWear, getTaskController);
//

// Delete task
router.delete("/:id", currentUserMiddleWear, deleteTaskController);
//

export { router as taskRouter };
