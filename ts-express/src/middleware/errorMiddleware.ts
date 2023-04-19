// ##### handler.ts #####

// type
import type { ErrorRequestHandler, Response } from "express";
import type { ApiResponse } from "../types";

/**
 * 에러 처리 핸들러
 * 에러 발생 시 해당 핸들러(미들웨어)로 에러가 들어옴
 *
 * @param error 에러 객체
 * @param req "express"의 request
 * @param res "express"의 response
 * @param next "express"의 next
 */
export const errorMiddleware: ErrorRequestHandler = (
  error,
  req,
  res: Response<ApiResponse>,
  next
) => {
  console.error("알 수 없는 에러 >> ", error);

  res.status(500).json({
    message: "서버의 문제입니다.\n잠시후에 다시 시도해주세요!",
  });
};
