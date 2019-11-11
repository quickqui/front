import { resolve } from "../Resolve";
import { model } from "../Model/Model";

export const onInit = async () => {
  const m = (await model) as any;
  //TODO optional navigation 状态如何？
  const onInitName: any =
    m && m.appLife
      ? m.appLife.find((life: any) => life.app === "front")
      : undefined;
  if (onInitName) {
    const initFu = await resolve<() => void>(onInitName.onInit);
    initFu();
  } else {
    //! don nothing here.
  }
};
