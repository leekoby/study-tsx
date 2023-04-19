import { RequestHandler } from "express";

// db
import { users } from "../db";

// lib
import { verifyToken } from "../lib";

/** 2023/04/18 - 로그인 여부 확인 - by 1-blue */
const isLoggedIn: RequestHandler = (req, res, next) => {
  const access_token = req.headers.authorization?.split("Bearer ")[1];

  // 인증 토큰 없다면
  if (!access_token) return res.status(403).send("로그인후에 접근해주세요!");

  // 인증 토큰이 있다면
  const verifyAccessToken = verifyToken("access", access_token);

  // 인증 토큰이 유효하다면 유저 정보 넣어주기
  if (verifyAccessToken.status !== "SUCCESS")
    return res.status(403).send("잘못된 토큰입니다!");

  // 토큰 정보에 일치하는 유저 확인
  const exUser = users.find(
    (user) => user.id === +verifyAccessToken.payload.id
  );

  // 토큰에 일치하는 유저가 없는 경우
  if (!exUser) return res.status(403).send("토큰과 일치하는 유저가 없습니다!");

  return next();
};

/** 2023/04/18 - 비로그인 여부 확인 - by 1-blue */
const isNotLoggedIn: RequestHandler = (req, res, next) => {
  const access_token = req.headers.authorization?.split("Bearer ")[1];

  // 인증 토큰이 있다면
  if (access_token) return res.status(403).send("로그아웃후에 접근해주세요!");

  return next();
};

export { isLoggedIn, isNotLoggedIn };
