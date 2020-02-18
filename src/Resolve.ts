import { env } from "./Env";
function _interopRequireDefault(obj: any) {
  return obj?.__esModule || obj?.default ? obj : { default: obj };
}
//TODO 这里是否应该有repository path，向其他地方一样？
//不是model机制级别问题，是web对resolve机制的实现能力问题。

//TODO 如何resolve node_modules里面的？
export const resolve = <T extends unknown>(path: string): Promise<T> => {
  console.log('env')
  console.log(env.extendPath );

  const basePath = "/Users/nielinjie/Projects/QuickQui/model-front";//env.extendPath || "../../linkToTestProjectDir";

  if (path.startsWith("@quick-qui/")) {
    const nodePath = `${basePath}/node_modules/${path}`;

    return import(`${nodePath}`).then(
      obj => _interopRequireDefault(obj).default as T
    );
  }
  //FIXME 只能在import里面写死常量前缀，否则前端找不到module，应该是需要在node端做一个动态的映射，在彼处需要告知路径。
  return import(`../../model-front/dist/${path}`).then(
    obj => _interopRequireDefault(obj).default as T
  );
  // if (env.name === "dev_docker") {
  //   return import(`../../../extendDir/dist/${path}`).then(
  //     obj => _interopRequireDefault(obj).default as T
  //   );
  // }
  // throw new Error("Only can resolve an known path");
};

export const resolveWithOutDefault = <T extends unknown>(
  path: string
): Promise<T> => {
   console.log("env");
   console.log(env.extendPath);

  const basePath = "/Users/nielinjie/Projects/QuickQui/model-front";//env.extendPath || "../../linkToTestProjectDir";
  if (path.startsWith("@quick-qui/")) {
    const nodePath = `${basePath}/node_modules/${path}`;
    console.log(nodePath);
    return import(`${nodePath}`);
  }
  return import(`../../model-front/dist/${path}`);
  // if (env.name === "dev_docker") {
  //   return import(`../../../extendDir/dist/${path}`).then(
  //     obj => _interopRequireDefault(obj).default as T
  //   );
  // }
  // throw new Error("Only can resolve an known path");
};
