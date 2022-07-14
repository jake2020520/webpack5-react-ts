import React from 'react';
import Home from '../pages/home';
import Login from '../pages/login';
import Learn from '../pages/learn';
import ReduxText from '../pages/reduxText';
export const RootRoutes: Array<any> = [
  {
    path: '/',
    name: 'login',
    icon: 'smile',
    exact: true,
    component: <Login />
  },
  {
    path: '/home',
    name: 'home',
    icon: 'smile',
    exact: true,
    component: <Home />
  },
  // 学习的测试案例
  {
    path: '/learn',
    name: 'learn',
    icon: 'smile',
    exact: true,
    component: <Learn />
  },
  // 测试 store的使用
  {
    path: '/redux-test',
    name: 'home',
    icon: 'smile',
    exact: true,
    component: <ReduxText />
  }
];
