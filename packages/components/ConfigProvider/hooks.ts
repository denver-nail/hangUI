import { ref, getCurrentInstance, inject, computed, provide, unref } from "vue";
import type { MaybeRef, Ref, App } from "vue";
import { createI18n, i18nSymbol } from "vue3-i18n";
import type { TranslatePair } from "@hangui/locale";
import English from "@hangui/locale/lang/en";
import { merge } from "lodash-es";
import { debugWarn } from "@hangui/utils";
import {
  configProviderContextKey,
  type ConfigProviderContext,
} from "./constants";

const globalConfig = ref<ConfigProviderContext>();
/**
 * 在组件中访问全局配置（ConfigProviderContext）。通过该钩子，你可以获取全局配置的某一项值，或者整个配置对象。
 * @param key
 * @param defaultVal
 */
/* 这里使用了 函数重载，使得 useGlobalConfig 可以有两种不同的调用方式：
1.传入 key 和 defaultVal：当你传入一个配置项的 key（键）时，返回该配置项的值，类型为 Ref<ConfigProviderContext[K]>。如果该配置项不存在，则返回 defaultVal。
2.不传入 key：如果你不传入 key，则返回整个 ConfigProviderContext 对象 */
export function useGlobalConfig<
  K extends keyof ConfigProviderContext,
  D extends ConfigProviderContext[K]
>(key: K, defaultVal?: D): Ref<Exclude<ConfigProviderContext[K], void>>;
export function useGlobalConfig(): Ref<ConfigProviderContext>;
export function useGlobalConfig(
  key?: keyof ConfigProviderContext,
  defaultValue = void 0
) {
  /* 
  getCurrentInstance() 是 Vue 3 的一个 API，用来获取当前组件实例。如果当前存在组件实例（即在组件内部使用这个钩子），那么通过 inject 从父级组件或全局配置中注入 configProviderContextKey（假设是一个 Symbol 或常量，表示全局配置的键）。globalConfig 会作为默认值提供给 inject。
  如果没有组件实例（即在外部或者没有父级配置），则直接使用本地的 globalConfig。
 */
  const config = getCurrentInstance()
    ? inject(configProviderContextKey, globalConfig)
    : globalConfig;
  /* 
  getCurrentInstance() 是 Vue 3 的一个 API，用来获取当前组件实例。如果当前存在组件实例（即在组件内部使用这个钩子），那么通过 inject 从父级组件或全局配置中注入 configProviderContextKey（假设是一个 Symbol 或常量，表示全局配置的键）。globalConfig 会作为默认值提供给 inject。
  如果没有组件实例（即在外部或者没有父级配置），则直接使用本地的 globalConfig。 */
  return key ? computed(() => config.value?.[key] ?? defaultValue) : config;
}

/* 笔记：
1）
<K extends keyof ConfigProviderContext, D extends ConfigProviderContext[K]>
K 是一个泛型类型，代表 ConfigProviderContext 对象中的 键，通过 keyof ConfigProviderContext 限制了 K 只能是 ConfigProviderContext 类型的键之一。
D 是另一个泛型类型，表示该键 K 对应的 值的类型，它的类型通过 ConfigProviderContext[K] 确定，即 K 对应的字段值的类型。
这使得 useGlobalConfig 函数能够根据传入的 key 参数推导出正确的类型，而无需在调用时手动指定。

2）
useGlobalConfig 函数签名中的 Ref<Exclude<ConfigProviderContext[K], void>> 就涉及了条件类型和类型排除（Exclude）。
ConfigProviderContext[K]：根据传入的 K，获取 ConfigProviderContext 中键 K 对应的类型。
Exclude<T, U>：是 TypeScript 中的条件类型，用来从类型 T 中排除掉 U 类型。具体来说，Exclude<ConfigProviderContext[K], void> 是指排除 void 类型，确保如果配置项值是 undefined 或 void，就不被包含在返回类型中。
这个条件类型的应用确保了返回的值类型不包括 void，即如果配置项不存在或者为 undefined，类型系统会将其排除，保证返回类型不会是 void。
*/
//私有方法
// 创建一个 I18n 实例的函数，接受一个可选的配置对象 `opts`。
const _createI18n = (opts?: ConfigProviderContext) => {
  // 定义一个 `mergeMessage` 函数，用于合并消息对象。
  // 它将传入的 `msg` 和 `opts.extendsI18nMsg` 合并，`opts.extendsI18nMsg` 默认是空对象。
  const mergeMessage = (msg: TranslatePair) =>
    merge(msg, opts?.extendsI18nMsg ?? {}); // 合并 `msg` 和扩展的国际化消息。

  // 如果 `opts` 中没有指定 `locale`，则使用默认的英文（"en"）配置。
  if (!opts?.locale) {
    return createI18n({
      locale: "en", // 默认语言设为英语
      messages: {
        en: English.el, // 英文语言包，来自 `English.el`
      },
    });
  }

  // 如果 `opts` 中指定了 `locale`，则根据传入的 `locale` 创建对应的国际化配置。
  return createI18n({
    // 使用 `opts.locale.name` 作为语言名称，如果没有指定，则使用默认的英文（"en"）。
    locale: opts.locale?.name || "en",

    // 合并语言包消息：默认的英文语言包与传入的 `locale` 对应的语言包
    messages: mergeMessage({
      en: English.el, // 默认的英文消息
      [opts.locale?.name]: opts.locale?.el ?? {}, // 合并传入的语言包，如果没有则使用空对象
    }),
  });
};

export function provideGlobalConfig(
  config: MaybeRef<ConfigProviderContext> = { locale: English },
  app?: App,
  global = false
) {
  const instance = getCurrentInstance();
  const oldCfg = instance ? useGlobalConfig() : void 0;
  const provideFn = app?.provide ?? (instance ? provide : void 0);
  if (!provideFn) {
    debugWarn(
      "provideGlobalConfig",
      "provideGlobalConfig() can only be used inside setup()"
    );
    return;
  }
  const context = computed(() => {
    const cfg = unref(config);
    if (!oldCfg?.value) return cfg;
    return merge(oldCfg.value, cfg);
  });
  const i18n = computed(() => _createI18n(context.value));
  provideFn(configProviderContextKey, context);
  provideFn(i18nSymbol, i18n.value);
  if (app) app.use(i18n.value);
  if (global || !globalConfig.value) {
    globalConfig.value = context.value;
  }
  return context;
}
