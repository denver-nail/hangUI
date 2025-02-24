import Notification from "./methods";
import { withinInstallFunction } from "@hangui/utils";
export const HNotification = withinInstallFunction(Notification, "$notify");
export * from "./types";
