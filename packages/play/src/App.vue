<script setup lang="ts">
import { computed, ref, h, reactive } from "vue";
import type { DropdownItemProps } from "@purple-liu/hangui";
import {
  ja,
  ko,
  en,
  zhCn,
  zhTw,
  HConfigProvider,
  HMessage,
  HNotification,
  HMessageBox,
  HLoading,
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
const form = reactive({
  name: "",
  desc: "",
});

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
function openNotify1() {
  HNotification({
    title: "Title",
    message: h("i", { style: "color:teal" }, "This is a remider"),
    position: "bottom-right",
  });
}

function openNotify2() {
  HNotification({
    title: "Prompt",
    message: "This is a message that does not auto close",
    duration: 0,
    position: "top-left",
    type: "danger",
  });
}
function openNotify3() {
  HNotification({
    title: "Prompt",
    message: "This is a message that does not auto close",
    duration: 0,
    position: "top-right",
    type: "danger",
  });
}

function openConfirm() {
  HMessageBox.confirm(
    "proxy will permanently delete the file. Continue?",
    "Warning",
    { type: "warning" }
  )
    .then((action: string) => {
      HMessage.info(`action: ${action}`);
    })
    .catch((action: string) => {
      HMessage.warning(`action: ${action}`);
    });
}
function openLoading1() {
  const _loading = HLoading.service({
    lock: true,
    spinner: "circle-notch",
    text: "加载中...",
    background: "rgba(255,255,255,0.5)",
  });
  setTimeout(() => {
    _loading.close();
  }, 2000);
}
const loading = ref(false);

function openLoading2() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
}
const switchBtn = ref(false);
const options = ref([
  { value: "beijing", label: "北京" },
  { value: "shanghai", label: "上海" },
  { value: "guangzhou", label: "广州", disabled: true },
]);
const optValue1 = ref("");
const optValue2 = ref("");
</script>

<template>
  <!-- 使用自己的按钮组件 -->
  <div>
    <h1>Button</h1>
    <h-button type="primary" size="small"> test </h-button>
  </div>
  <hr />
  <!-- 使用自己的tooltip组件 -->
  <div>
    <h1>Tooltip</h1>
    <h-button ref="buttonRef">tooltip</h-button>
  </div>

  <hr />
  <div>
    <h1>Popcomfirm</h1>
    <h-button @click="changelang" type="info" style="margin-right: 20px"
      >change language</h-button
    >
    <h-config-provider :locale="locale">
      <h-popconfirm
        title="确定删除吗？"
        @confirm="popConfirm"
        @cancel="popCancel"
      >
        <h-button type="primary" size="small"> popconfirm </h-button>
      </h-popconfirm>
    </h-config-provider>
  </div>
  <!-- 使用自己的Popconfirm组件 -->

  <hr />
  <div>
    <h1>Dropdown</h1>
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
  </div>
  <!-- 使用自己的dropdown组件 -->

  <hr />
  <!-- 使用自己的message组件 -->
  <div>
    <h1>Message</h1>
    <h-button :plain="true" @click="open1">Message</h-button>
    <h-button :plain="true" @click="open2">Success</h-button>
    <h-button :plain="true" @click="open3">Warning</h-button>
    <h-button :plain="true" @click="open4">Error</h-button>

    <h-button @click="open1">插件式调用</h-button>
    <h-button @click="open5">函数式调用</h-button>
    <h-button @click="$message.danger('Congrats, this is a success message.')"
      >全局方法调用</h-button
    >
  </div>

  <hr />
  <!-- 使用自己的notification组件 -->
  <div>
    <h1>notification组件</h1>
    <h-button :plain="true" @click="openNotify1">自动关闭</h-button>
    <h-button :plain="true" @click="openNotify2">不自动关闭</h-button>
    <!-- 不同方向的notification组件 -->
    <h-button :plain="true" @click="openNotify3">其他方向</h-button>

    <h-button
      :plain="true"
      @click="
        $notify.danger({
          title: 'Prompt',
          message: 'This is a message that does not auto close',
        })
      "
      >全局调用</h-button
    >
  </div>
  <hr />
  <!-- 使用自己的Input组件 -->
  <div>
    <h1>Input</h1>
    <h-input v-model="form.name" show-password type="password" />
    <h-input v-model="form.desc" type="textarea" />
  </div>
  <hr />
  <!-- 使用自己的MessageBox组件 -->
  <div>
    <h1>MessageBox</h1>
    <h-button @click="openConfirm" plain> Click to open the Confirm</h-button>
  </div>
  <hr />
  <!-- 使用自己的Loading组件 -->
  <div>
    <h1>Loading</h1>
    <h-button type="primary" @click="openLoading1"> As a service </h-button>
    <h-button
      v-loading.fullscreen.lock="loading"
      er-loading-text="拼命加载中"
      type="primary"
      @click="openLoading2"
    >
      As a directive
    </h-button>
  </div>
  <hr />
  <!-- 使用自己的swith组件 -->
  <div>
    <h1>Switch</h1>
    <p>switchBtn:{{ switchBtn }}</p>
    <h-switch
      v-model="switchBtn"
      active-value="按月付费"
      inactive-value="按年付费"
      size="small"
    />
  </div>
  <hr />
  <!-- 使用自己的select组件 -->
  <div>
    <h1></h1>
    <h-select
      v-model="optValue1"
      :options="options"
      clearable
      filterable
    ></h-select>
    <h-select v-model="optValue2">
      <h-option value="beijing" label="op1" />
      <h-option value="shanghai" label="op2" disabled />
      <h-option value="guangzhou" label="op3" />
    </h-select>
  </div>
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
