import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { authRouter, todoRouter } from './router';
import { userMiddleware, errorMiddleware, isLoggedIn, isNotLoggedIn } from './middleware';

const app = express();
app.set('PORT', 8000);

// middleware
app.use(morgan('dev'));
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 로그인한 유저 정보를 "req.user"로 넣어주는 middleware
app.use(userMiddleware);

// router
app.use('/auth', isNotLoggedIn, authRouter);
// app.use('/todos', isLoggedIn, todoRouter); //여기 수정했음
app.use('/todos', todoRouter);

// error 처리 미들웨어
app.use(errorMiddleware);

app.listen(app.get('PORT'), () =>
  console.log(`
  #################################
      🚀${app.get('PORT')}번 실행🚀   
  #################################
  `)
);
