import type { Todo } from '../types';

/** 2023/04/18 - Todo 데이터들 ( DB 대체 ) - by 1-blue */
export const todos: Todo[] = [
  // 1번 유저 ( a@naver.com )
  {
    id: 1,
    isCompleted: true,
    todo: '간지나게 숨쉬기',
    userId: 1,
  },
  {
    id: 2,
    isCompleted: false,
    todo: '끝내주게 밥 먹기',
    userId: 1,
  },
  {
    id: 3,
    isCompleted: false,
    todo: '열심히 공부하기',
    userId: 1,
  },

  // 2번 유저 ( b@naver.com )
  {
    id: 4,
    isCompleted: true,
    todo: '대충 살기',
    userId: 2,
  },
  {
    id: 5,
    isCompleted: true,
    todo: '내일의 나에게 맡기기',
    userId: 2,
  },

  // 3번 유저 ( c@naver.com )
  {
    id: 6,
    isCompleted: false,
    todo: '아무것도 하지 않을 거면 죽어버려',
    userId: 3,
  },
];
