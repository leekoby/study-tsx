import express from "express";

// db
import { users } from "../db";

// lib
import { generateAccessToken } from "../lib";

// type
import type { Request, Response, NextFunction } from "express";
import type { User } from "../types";

const authRouter = express.Router();

/** 2023/04/18 - 회원가입 - by 1-blue */
authRouter.post(
  "/signup",
  async (
    req: Request<{}, {}, Pick<User, "email" | "password">>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;

      // 유저 존재 여부 확인
      if (users.find((user) => user.email === email))
        return res.status(404).send("이미 가입된 유저가 존재합니다!");

      // 생성될 유저
      const createdUser = { id: users.length + 1, email, password };

      // 유저 DB에 등록
      users.push(createdUser);

      return res.status(201).end();
    } catch (error) {
      // 에러를 넘겨주면 이전에 봤던 "errorHandler"로 넘어가서 처리됨
      next(error);
    }
  }
);

/** 2023/04/18 - 로그인 - by 1-blue */
authRouter.post(
  "/signin",
  async (
    req: Request<{}, {}, Pick<User, "email" | "password">>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;

    try {
      const exUser = users.find((user) => {
        if (user.email !== email) return false;
        if (user.password !== password) return false;

        return true;
      });

      // 유저 존재 여부 확인
      if (!exUser)
        return res.status(404).send("아이디나 패스워드를 확인해주세요!");

      // 인증 토큰 생성
      const accessToken = generateAccessToken({ id: exUser.id });

      return res.status(200).json({ access_token: accessToken });
    } catch (error) {
      // 에러를 넘겨주면 이전에 봤던 "errorHandler"로 넘어가서 처리됨
      next(error);
    }
  }
);

export { authRouter };
