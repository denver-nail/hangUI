<script setup lang="ts">
import { computed, ref, h } from "vue";
import type { DropdownItemProps } from "@purple-liu/hangui";
import {
  ja,
  ko,
  en,
  zhCn,
  zhTw,
  HConfigProvider,
  HMessage,
} from "@purple-liu/hangui";
import { get } from "lodash-es";

const language = ref("");
const langMap = {
  ja,
  ko,
  en,
  zhCn,
  zhTw,
} as const;
const locale = computed(() => get(langMap, language.value));
const changelang = () => {
  const l = ["zhCn", "zhTw", "ko", "en", "ja"];
  language.value = l[(l.indexOf(language.value) + 1) % l.length];
};
const buttonRef = ref(null);
function popConfirm() {
  console.log("confirm");
}
function popCancel() {
  console.log("cancel");
}
const items: DropdownItemProps[] = [
  { command: "1", label: "Action 1" },
  { command: "2", label: "Action 2" },
  { command: "3", label: "Action 3", disabled: true },
  { command: "4", label: "Action 4", disabled: true },
];

const open1 = () => {
  HMessage({
    showClose: true,
    message: "This is a message.",
  });
};
const open2 = () => {
  HMessage({
    showClose: true,
    message: "Congrats, this is a success message.",
    type: "success",
  });
};
const open3 = () => {
  HMessage({
    showClose: true,
    message: "Warning, this is a warning message.",
    type: "warning",
  });
};
const open4 = () => {
  HMessage({
    showClose: true,
    message: "Oops, this is a error message.",
    type: "danger",
  });
};
const open5 = () => {
  HMessage.success("Congrats, this is a success message.");
};
</script>

<template>
  <h-config-provider :locale="locale">
    <h-popconfirm
      title="确定删除吗？"
      @confirm="popConfirm"
      @cancel="popCancel"
    >
      <h-button type="primary" size="small"> popconfirm </h-button>
    </h-popconfirm>
  </h-config-provider>
  <!-- 使用自己的按钮组件 -->
  <h-button type="primary" size="small"> test </h-button>
  <!-- 使用自己的tooltip组件 -->
  <h-tooltip
    :virtualTriggering="true"
    :virtualRef="buttonRef"
    content="This is a tooltip"
    trigger="click"
  >
    <!-- Tooltip content can be empty or have default slot content -->
  </h-tooltip>
  <h-button ref="buttonRef">tooltip</h-button>
  <!-- 使用自己的Popconfirm组件 -->
  <h-button @click="changelang" type="info" style="margin-right: 20px"
    >change language</h-button
  >
  <!-- 使用自己的dropdown组件 -->
  <div class="row">
    <div class="col">
      <div class="desc">disabled</div>
      <h-dropdown :items="items" disabled>
        <span class="dropdown-link">
          Dropdown List
          <h-icon icon="angle-down" />
        </span>
      </h-dropdown>
    </div>
    <div class="col">
      <div class="desc">undisabled</div>
      <h-dropdown :items="items">
        <span class="dropdown-link">
          Dropdown List
          <h-icon icon="angle-down" />
        </span>
      </h-dropdown>
    </div>
  </div>

  <!-- 使用自己的message组件 -->
  <h-button :plain="true" @click="open1">Message</h-button>
  <h-button :plain="true" @click="open2">Success</h-button>
  <h-button :plain="true" @click="open3">Warning</h-button>
  <h-button :plain="true" @click="open4">Error</h-button>

  <h-button @click="open1">插件式调用</h-button>
  <h-button @click="open5">函数式调用</h-button>
  <h-button @click="$message.success('Congrats, this is a success message.')"
    >全局方法调用</h-button
  >
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}
.col {
  flex: 1;
}
.desc {
  display: block;
  color: var(--er-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--er-color-primary);
  i {
    margin-left: 8px;
  }
}
</style>
