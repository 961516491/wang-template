<script lang="ts">
export default {
  name: "ReImageVerify"
};
</script>

<script setup lang="ts">
import { watch, onMounted } from "vue";
import { getVerify } from "/@/api/user";
import { useImageVerify } from "./hooks";

interface Props {
  code?: string;
}

interface Emits {
  (e: "update:code", code: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  code: ""
});

const emit = defineEmits<Emits>();

const { domRef, imgCode, setImgCode, getImgCode } = useImageVerify();

/** 渲染验证码 */
const refreshCode = () => {
  getVerify().then(res => {
    debugger;
  });
};
onMounted(() => {
  refreshCode();
});

watch(
  () => props.code,
  newValue => {
    setImgCode(newValue);
  }
);
watch(imgCode, newValue => {
  emit("update:code", newValue);
});

defineExpose({ getImgCode });
</script>

<template>
  <canvas
    ref="domRef"
    width="120"
    height="40"
    class="cursor-pointer"
    @click="getImgCode"
  />
</template>
