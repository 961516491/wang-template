<script setup lang="ts">
import Motion from "./utils/motion";
import { useRouter } from "vue-router";
import { loginRules } from "./utils/rule";
import phone from "./components/phone.vue";
import qrCode from "./components/qrCode.vue";
import regist from "./components/regist.vue";
import update from "./components/update.vue";
import { initRouter } from "/@/router/utils";
import { message } from "@pureadmin/components";
import type { FormInstance } from "element-plus";
import { ref, reactive, watch, computed } from "vue";
import { operates, thirdParty } from "./utils/enums";
import { useUserStoreHook } from "/@/store/modules/user";
import { bg, avatar, currentWeek } from "./utils/static";
import SeedCaptcha from "/@/components/SeedCaptcha/index.vue";
import { useRenderIcon } from "/@/components/ReIcon/src/hooks";

const imgCode = ref("");
const router = useRouter();
const loading = ref(false);
const checked = ref(false);
const ruleFormRef = ref<FormInstance>();
const currentPage = computed(() => {
  return useUserStoreHook().currentPage;
});

const ruleForm = reactive({
  username: "admin",
  password: "123456",
  captcha: "",
  cvc: ""
});

const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      useUserStoreHook()
        .loginByUsername(ruleForm)
        .then(() => {
          loading.value = false;
          initRouter().then(() => {});
          message.success("登录成功");
          router.push("/");
        });
    } else {
      loading.value = false;
      return fields;
    }
  });
};

function onHandle(value) {
  useUserStoreHook().SET_CURRENTPAGE(value);
}

watch(imgCode, value => {
  useUserStoreHook().SET_VERIFYCODE(value);
});
</script>

<template>
  <img :src="bg" class="wave" />
  <div class="login-container">
    <div class="img">
      <component :is="currentWeek" />
    </div>
    <div class="login-box">
      <div class="login-form">
        <avatar class="avatar" />
        <Motion>
          <h2>Seed Admin</h2>
        </Motion>

        <el-form
          v-if="currentPage === 0"
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="loginRules"
          size="large"
          @keyup.enter="onLogin(ruleFormRef)"
        >
          <Motion :delay="100">
            <el-form-item prop="username">
              <el-input
                clearable
                v-model="ruleForm.username"
                placeholder="账号"
                :prefix-icon="useRenderIcon('user')"
              />
            </el-form-item>
          </Motion>

          <Motion :delay="150">
            <el-form-item prop="password">
              <el-input
                clearable
                show-password
                v-model="ruleForm.password"
                placeholder="密码"
                :prefix-icon="useRenderIcon('lock')"
              />
            </el-form-item>
          </Motion>

          <Motion :delay="200">
            <el-form-item prop="code">
              <el-input
                clearable
                v-model="ruleForm.captcha"
                placeholder="验证码"
              >
                <template v-slot:append>
                  <SeedCaptcha v-model:cvc="ruleForm.cvc" />
                </template>
              </el-input>
            </el-form-item>
          </Motion>

          <Motion :delay="250">
            <el-form-item>
              <div class="w-full h-20px flex justify-between items-center">
                <el-checkbox v-model="checked">记住密码</el-checkbox>
                <el-button
                  type="text"
                  @click="useUserStoreHook().SET_CURRENTPAGE(4)"
                >
                  忘记密码?
                </el-button>
              </div>
              <el-button
                class="w-full mt-4"
                size="default"
                type="primary"
                :loading="loading"
                @click="onLogin(ruleFormRef)"
              >
                登录
              </el-button>
            </el-form-item>
          </Motion>

          <Motion :delay="300">
            <el-form-item>
              <div class="w-full h-20px flex justify-between items-center">
                <el-button
                  v-for="(item, index) in operates"
                  :key="index"
                  class="w-full mt-4"
                  size="default"
                  @click="onHandle(index + 1)"
                >
                  {{ item.title }}
                </el-button>
              </div>
            </el-form-item>
          </Motion>
        </el-form>

        <Motion v-if="currentPage === 0" :delay="350">
          <el-form-item>
            <el-divider>
              <p class="text-gray-500 text-xs">第三方登录</p>
            </el-divider>
            <div class="w-full flex justify-evenly">
              <span
                v-for="(item, index) in thirdParty"
                :key="index"
                :title="`${item.title}登陆`"
              >
                <IconifyIconOnline
                  :icon="`ri:${item.icon}-fill`"
                  width="20"
                  class="cursor-pointer text-gray-500 hover:text-blue-400"
                />
              </span>
            </div>
          </el-form-item>
        </Motion>
        <!-- 手机号登陆 -->
        <phone v-if="currentPage === 1" />
        <!-- 二维码登陆 -->
        <qrCode v-if="currentPage === 2" />
        <!-- 注册 -->
        <regist v-if="currentPage === 3" />
        <!-- 忘记密码 -->
        <update v-if="currentPage === 4" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("/@/style/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
