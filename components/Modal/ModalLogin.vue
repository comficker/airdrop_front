<template>
  <div class="space-y-3">
    <div class="flex justify-between uppercase">
      <div class="uppercase font-bold">{{isRegister ? 'Register': 'Login'}} Form</div>
      <div class="cursor-pointer text-blue-500 underline" @click="isRegister = !isRegister">{{isRegister ? 'Login': 'Register'}}</div>
    </div>
    <input
      v-if="isRegister"
      v-model="form.email" class="border outline-none p-2 w-full" type="email"
      placeholder="Email">
    <input
      v-model="form.username" class="border outline-none p-2 w-full" type="text"
      placeholder="Username"
    >
    <input
      v-if="!isRegister"
      v-model="form.password" class="border outline-none p-2 w-full" type="password"
      placeholder="Password"
    >
    <input
      v-if="isRegister"
      v-model="form.password_1" class="border outline-none p-2 w-full" type="password"
      placeholder="Password">
    <input
      v-if="isRegister"
      v-model="form.password_2" class="border outline-none p-2 w-full" type="password"
      placeholder="Repeat Password">
    <div
      class="text-center p-1.5 px-3 items-center bg-green-600 text-white uppercase cursor-pointer font-bold"
      @click="submit"
    >{{isRegister ? 'Register': 'Login'}}</div>
  </div>
</template>

<script>
export default {
  name: "ModalLogin",
  data() {
    return {
      isRegister: false,
      form: {
        username: '',
        email: '',
        password: '',
        password_1: '',
        password_2: ''
      }
    }
  },
  methods: {
    async submit() {
      if (this.isRegister) {
        const res = await this.$auth.register(this.form)
        if (res) {
          this.isRegister = false
        }
      } else {
        const res = await this.$auth.login(this.form)
        console.log(res);
        if (res) {
          this.$store.commit('config/SET_MODAL', null)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
