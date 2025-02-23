import type { Language, TranslatePair } from "@hangui/locale";
export interface ConfigProviderProps {
  locale?: Language;
  extendsI18nMsg?: TranslatePair;
}
