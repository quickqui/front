import { resolve } from "../Resolve";
import { model } from "../Model/Model";
import { withImplementationModel } from "@quick-qui/model-defines/dist/implementation/ImplementationModel";

export const onInit = async () => {
  //TODO optional navigation 状态如何？
  const onInitName: any | undefined = withImplementationModel(
    model
  )?.implementationModel?.implementations?.find(
    implementation => implementation.name === "front"
  )?.lifeCircle["init"];
  if (onInitName) {
    const initFu = await resolve<() => void>(onInitName.onInit);
    initFu();
  } else {
    //! don nothing here.
  }
};
