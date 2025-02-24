import Message from "./methods";
import { withinInstallFunction } from "@hangui/utils";
export const HMessage = withinInstallFunction(Message, "$message");
export * from "./types";
