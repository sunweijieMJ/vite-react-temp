import { SagaReturnType } from 'redux-saga/effects';

declare global {
  /**
   * 获取saga返回值类型(SagaReturnType的简写)
   */
  type SR<T extends (...args: any[]) => any> = SagaReturnType<T>;

  /**
   * 获取对象值的类型
   */
  export type ValueOf<T> = T[keyof T];
}
