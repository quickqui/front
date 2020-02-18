import _ from "lodash";
import { filterObject } from "./Util";

export const env: {
  env: string;
  modelUrl: string;
  appServerUrl: string;
  extendPath: string;
} = (() => {
  let defaults: any = {};
  // if (
  //   process.env.ENV === "dev_local" ||
  //   process.env.REACT_APP_ENV === "dev_local"
  // )
  //   defaults = {
  //     env: "dev_local",
  //     modelUrl: "http://localhost:1111",
  //     appServerUrl: "http://localhost:4000",
  //     extendPath: "../../../../huadahengxinProjects/fake_device/use-quickqui"
  //   };
  // if (
  //   process.env.ENV === "dev_docker" ||
  //   process.env.REACT_APP_ENV === "dev_docker"
  // )
  //   defaults = {
  //     env: "dev_docker",
  //     modelUrl: "http://model-server:1111",
  //     appServerUrl: "http://app-server:4000",
  //     extendPath: "/extendDir"
  //   };
  // else
  defaults = {
    env: "unknown",
    modelUrl: "http://localhost:1111",
    appServerUrl: "http://localhost:4000",
    extendPath: "../../../../huadahengxinProjects/fake_device/use-quickqui"
  };

  const re = _.assign(
    {},
    defaults,
    filterObject({
      env: process.env.ENV || process.env.REACT_APP_ENV,
      modelUrl: process.env.MODEL_URL || process.env.REACT_APP_MODEL_URL,
      appServerUrl: process.env.APP_SERVER_URL || process.env.REACT_APP_SERVER_URL,
      extendPath: process.env.EXTEND_PATH || process.env.REACT_APP_EXTEND_PATH
    })
  );
  console.dir(re);
  return re;
})();
