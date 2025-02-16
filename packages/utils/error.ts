//定义通用的错误类型和操作
import { isString } from "lodash-es";

class HUIError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "HUIError";
  }
}
/**
 * 抛出错误函数
 * @param scope 标识该错误来自什么地方
 * @param msg 错误信息
 */
export function throwwError(scope: string, msg: string) {
  throw new HUIError(`[${scope}]:${msg}`);
}
//debugWarn函数的重载

export function debugWarn(error: Error): void;
export function debugWarn(scope: string, msg: string): void;
//debugWarn的实现
export function debugWarn(scope: string | Error, msg?: string) {
  if (process.env.NODE_ENV !== "production") {
    const err = isString(scope) ? new HUIError(scope) : scope;
    console.warn(err);
  }
}
