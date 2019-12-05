import { resolve } from "../Resolve";
import { model } from "../Model/Model";
import {
  withImplementationModel,
  Implementation
} from "@quick-qui/model-defines/";

export const onInit = async () => {
  const onInitName: any | undefined = withImplementationModel(
    model
  )?.implementationModel?.implementations?.find(
    (implementation: Implementation) => implementation.name === "front"
  )?.lifeCycle?.["init"];

  if (onInitName) {
    const initFu = await resolve<() => void>(onInitName.onInit);
    initFu();
  } else {
    //! don nothing here.
  }
};
