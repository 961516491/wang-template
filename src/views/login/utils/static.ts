import { computed } from "vue";
import bg from "/@/assets/login/bg.png";
import avatar from "/@/assets/login/avatar.svg?component";
// import avatar from "/@/assets/logo.svg";
import illustration from "/@/assets/login/illustration.svg?component";

const currentWeek = computed(() => {
  return illustration;
});

export { bg, avatar, currentWeek };
