import { each, isFunction } from "lodash-es";
import shell from "shelljs";
/**
 如果传入了 rmfiles 参数，插件会在构建开始时删除指定的文件。
执行自定义操作： 如果传入了 beforeBuild 和 afterBuild 函数，它们会分别在构建开始前和结束后被调用。
 */
export default function hooksPlugin({
  rmfiles = [],
  beforeBuild,
  afterBuild,
}: {
  rmfiles?: string[];
  beforeBuild?: Function;
  afterBuild?: Function;
}) {
  return {
    name: "hooks-plugin",
    buildStart() {
      each(rmfiles, (fName) => shell.rm("-rf", fName));
      isFunction(beforeBuild) && beforeBuild();
    },
    buildEnd(err?: Error) {
      !err && isFunction(afterBuild) && afterBuild();
    },
  };
}
