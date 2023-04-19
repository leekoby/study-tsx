import express from "express";

// dummy data
import { todos } from "../db";

// type
import type { Request, Response, NextFunction } from "express";
import type { Todo } from "../types";

const todoRouter = express.Router();

/** 2023/04/18 - todo 생성 - by 1-blue */
todoRouter.post(
  "/",
  async (
    req: Request<{}, {}, Pick<Todo, "todo">>,
    res: Response<Todo | string>,
    next: NextFunction
  ) => {
    try {
      if (!req.user) return res.status(403).send("로그인후에 접근해주세요!");

      const { todo } = req.body;

      // 새로운 todo 생성
      const createdTodo = {
        id: todos.length + 1,
        isCompleted: false,
        todo,
        userId: req.user.id,
      };

      // 원본 수정
      todos.push(createdTodo);

      return res.status(201).json(createdTodo);
    } catch (error) {
      // 에러를 넘겨주면 이전에 봤던 "errorHandler"로 넘어가서 처리됨
      next(error);
    }
  }
);

/** 2023/04/18 - todo들 읽기 - by 1-blue */
todoRouter.get(
  "/",
  async (req: Request, res: Response<Todo[] | string>, next: NextFunction) => {
    try {
      if (!req.user) return res.status(403).send("로그인후에 접근해주세요!");

      const targetTodos = todos.filter((todo) => todo.userId === req.user?.id);

      return res.status(200).json(targetTodos);
    } catch (error) {
      // 에러를 넘겨주면 이전에 봤던 "errorHandler"로 넘어가서 처리됨
      next(error);
    }
  }
);

/** 2023/04/18 - 특정 todo 수정 - by 1-blue */
todoRouter.put(
  "/:id",
  async (
    req: Request<{ id: string }, {}, Omit<Todo, "id" | "userId">>,
    res: Response<Todo>,
    next: NextFunction
  ) => {
    try {
      // TODO: 인증 미들웨어 생성

      const id = +req.params.id;
      const { todo, isCompleted } = req.body;

      // 원본 인덱스 찾고
      const targetIndex = todos.findIndex((todo) => todo.id === id);

      // 원본을 기반으로 수정된 데이터 생성
      const updatedTodo = { ...todos[targetIndex], todo, isCompleted };

      // 원본 수정
      todos.splice(targetIndex, 1, updatedTodo);

      return res.status(200).json(updatedTodo);
    } catch (error) {
      // 에러를 넘겨주면 이전에 봤던 "errorHandler"로 넘어가서 처리됨
      next(error);
    }
  }
);

/** 2023/04/18 - 특정 todo 삭제 - by 1-blue */
todoRouter.delete(
  "/:id",
  async (
    req: Request<{ id: string }>,
    res: Response<Todo>,
    next: NextFunction
  ) => {
    try {
      const id = +req.params.id;

      // 원본 인덱스 찾고
      const targetIndex = todos.findIndex((todo) => todo.id === id);

      // 원본 수정
      todos.splice(targetIndex, 1);

      return res.status(204).end();
    } catch (error) {
      // 에러를 넘겨주면 이전에 봤던 "errorHandler"로 넘어가서 처리됨
      next(error);
    }
  }
);

export { todoRouter };
