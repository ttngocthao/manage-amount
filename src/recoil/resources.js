import { atom } from "recoil";
export const resourcesState = atom({
  key: "resourcesState",
  default: {
    loaded: false,
    data: [],
  },
});
