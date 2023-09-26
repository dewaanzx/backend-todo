const express = require("express");

const router = express.Router();

const TodoController = require("../app/controller/todo.controller");
const TodoValidator = require("../app/validator/todo.validator");
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /todo:
 *  get:
 *     tags:
 *     - ToDo
 *     summary: Get all ToDo list based on authentication
 *     security:
 *	     - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/todo", AuthMiddleware, TodoController.index);

/**
 * @openapi
 * /todo:
 *  post:
 *     tags:
 *     - ToDo
 *     summary: Add ToDo to the list
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - task
 *            properties:
 *              task:
 *               type: string
 *              group_id:
 *               type: integer
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post("/todo", AuthMiddleware, TodoValidator.store, TodoController.store);

/**
 * @openapi
 * /todo/{id}:
 *  put:
 *     tags:
 *     - ToDo
 *     summary: Check (1) or Uncheck (0) ToDo list
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the ToDo
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.put("/todo/:id", AuthMiddleware, TodoController.update);

/**
 * @openapi
 * /todo/{id}:
 *  delete:
 *     tags:
 *     - ToDo
 *     summary: Delete ToDo
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the todo
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/todo/:id", AuthMiddleware, TodoController.destroy);

module.exports = router;
