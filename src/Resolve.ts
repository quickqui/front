import { env } from "./Env";
function _interopRequireDefault(obj: any) {
  return obj?.__esModule || obj?.default ? obj : { default: obj };
}
//TODO 这里是否应该有repository path，向其他地方一样？
//不是model机制级别问题，是web对resolve机制的实现能力问题。

//TODO 如何resolve node_modules里面的？
export const resolve = <T extends unknown>(path: string): Promise<T> => {
  if (env.name === "dev_local") {
    if (path.startsWith("@quick-qui/")) {
      const nodePath = `/Users/nielinjie/Projects/QuickQui/linkToTestProjectDir/node_modules/${path}.js`;

      return import(`${nodePath}`).then(
        obj => _interopRequireDefault(obj).default as T
      );
    }
    return import(`../../linkToTestProjectDir/dist/${path}`).then(
      obj => _interopRequireDefault(obj).default as T
    );
  }
  // if (env.name === "dev_docker") {
  //   return import(`../../../extendDir/dist/${path}`).then(
  //     obj => _interopRequireDefault(obj).default as T
  //   );
  // }
  throw new Error("Only can resolve an known path");
};

export const resolveWithOutDefault = <T extends unknown>(
  path: string
): Promise<T> => {
  if (env.name === "dev_local") {
    if (path.startsWith("@quick-qui/")) {
      const nodePath = `/Users/nielinjie/Projects/QuickQui/linkToTestProjectDir/node_modules/${path}`;
      console.log(nodePath);
      return import(`${nodePath}`);
    }
    return import(`../../linkToTestProjectDir/dist/${path}`);
  }
  // if (env.name === "dev_docker") {
  //   return import(`../../../extendDir/dist/${path}`).then(
  //     obj => _interopRequireDefault(obj).default as T
  //   );
  // }
  throw new Error("Only can resolve an known path");
};
