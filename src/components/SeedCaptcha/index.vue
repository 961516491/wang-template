<template>
  <img class="catcha" :src="imgCode" @click="refreshCode()" />
</template>

<script lang="ts">
export default {
  name: "SeedCaptcha"
};
</script>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import { getVerify } from "/@/api/user";

interface Emits {
  (e: "update:cvc", code: string): void;
}

const emit = defineEmits<Emits>();

const imgCode = ref("");

const refreshCode = () => {
  getVerify().then(res => {
    imgCode.value = res.data.captcha;
    emit("update:cvc", res.data.cvc);
  });
};

onMounted(() => {
  refreshCode();
});
</script>

<style lang="scss">
.catcha {
  width: 120px;
  height: 40px;
}
</style>
