import type { RequestHandler } from "express";

// db
import { users } from "../db";

// lib
import { verifyToken } from "../lib";

/** 2023/04/18 - 로그인 유무 확인 후 유저 데이터 넣어줌 - by 1-blue */
export const userMiddleware: RequestHandler = (req, res, next) => {
  const access_token = req.headers.authorization?.split("Bearer ")[1];

  // 인증 토큰 없다면
  if (!access_token) return next();

  // 인증 토큰이 있다면
  const verifyAccessToken = verifyToken("access", access_token);

  // 인증 토큰이 유효하다면 유저 정보 넣어주기
  if (verifyAccessToken.status === "SUCCESS") {
    const exUser = users.find(
      (user) => user.id === +verifyAccessToken.payload.id
    );

    req.user = exUser;
  }

  return next();
};
