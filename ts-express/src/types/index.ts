/**
 * "Response" 필수 타입을 지정한 타입
 * 모든 응답에서 아래와 같은 규약에 맞게 응답하기위해 사용하는 타입
 */
export type ApiResponse<T extends {} = {}> = {
  message: string;
} & T;

export * from "./todo";
export * from "./user";
