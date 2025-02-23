import { inject, type Ref } from "vue";
import { omit } from "lodash-es";
import { createI18n, i18nSymbol, type I18nInstance } from "vue3-i18n";
import type { Language } from "@hangui/locale";
import English from "@hangui/locale/lang/en";
/**
 *useLocale 钩子用于动态获取或创建国际化实例，支持传入自定义语言配置。
 * @param localeOverrides  
如果没有传入 localeOverrides，则尝试从上下文中获取现有的国际化实例；如果没有，则创建一个新的实例，默认使用英文。
如果传入了 localeOverrides，则创建一个新的国际化实例，加载英文和传入的语言包。
 * @returns 返回一个剔除 install 属性的国际化实例，避免重复安装。
 */
//该钩子与usei18n的区别在于：可以传入一个非顶层注入的语言取出其t函数
export function useLocale(localeOverrides?: Ref<Language>) {
  //如果没有传入 localeOverrides，它会尝试从上下文中获取现有的国际化实例。如果没有的话，它会创建一个新的国际化实例，并使用 English 作为默认语言。
  if (!localeOverrides) {
    return omit(
      <I18nInstance>(
        inject(
          i18nSymbol,
          createI18n({ locale: English.name, messages: { en: English.el } })
        )
      ),
      //避免重复安装
      "install"
    );
  }
  return omit(
    createI18n({
      locale: localeOverrides.value.name,
      messages: {
        en: English.el,
        [localeOverrides.value.name]: localeOverrides.value.el,
      },
    }),
    "install"
  );
}

export default useLocale;
