import { JsonWebTokenError, sign, verify, type JwtPayload } from "jsonwebtoken";

// 원래는 숨겨야 하는 엑세스 키
const ACCESS_SECRET = "keyboard-cat";

interface Payload {
  id: number;
}
interface generateTokenHandler {
  (payload: Payload): string;
}
/**
 * 2023/03/26 - 인증 토큰 발행 ( 유효 기간 1시간 ) - by 1-blue
 * @param payload 토큰의 페이로드
 * @returns 인증 토큰
 */
export const generateAccessToken: generateTokenHandler = (payload) =>
  sign(payload, ACCESS_SECRET, { expiresIn: "12h" });

interface VerifyTokenHandler {
  (type: "access" | "refresh", token: string):
    | {
        payload: JwtPayload;
        status: "SUCCESS";
      }
    | {
        payload: null;
        status: "EXPIRED" | "INVALID";
      };
}
/**
 * 2023/03/26 - 토큰 검증 - by 1-blue
 * @param type 토큰 타입
 * @param token 검증할 토큰
 * @returns 검증 결과
 */
export const verifyToken: VerifyTokenHandler = (type, token) => {
  let secretKey = "";

  switch (type) {
    case "access":
      secretKey = ACCESS_SECRET;
      break;
    case "refresh":
      // secretKey = process.env.REFRESH_SECRET;
      break;
  }

  try {
    const payload = verify(token, secretKey) as JwtPayload;

    return { payload, status: "SUCCESS" };
  } catch (error) {
    // 토큰 관련 에러
    if (error instanceof JsonWebTokenError) {
      // 인증 토큰 만료 ( 인증 토큰 재발급 )
      if (error.message === "jwt expired") {
        return { payload: null, status: "EXPIRED" };
      }
    }

    return { payload: null, status: "INVALID" };
  }
};
