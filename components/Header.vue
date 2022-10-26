<template>
  <header>
    <div class="max-w-2xl mx-auto flex gap-4 items-center justify-between font-bold">
      <div class="flex-1 flex items-center gap-6">
        <nuxt-link class="w-32" to="/">
          <img :src="`/logo${dark ? '-dark': ''}.png`" alt="Ongoing Airdrop">
        </nuxt-link>
        <div class="flex-1 flex items-center gap-3">
          <div class="w-3 h-3 flex items-center justify-center rounded-full bg-green-400">
            <div class="animate-ping w-3 h-3 rounded-full bg-green-400">
            </div>
          </div>
          <div class="flex gap-4 font-bold text-gray-500">
            <nuxt-link to="/" class="cursor-pointer">Ongoing</nuxt-link>
            <nuxt-link to="/upcoming" class="cursor-pointer">Upcoming</nuxt-link>
            <nuxt-link to="/submit" class="cursor-pointer">Submit</nuxt-link>
          </div>
        </div>
      </div>
      <div class="flex-1 flex justify-end">
        <client-only>
          <div class="p-1 px-2 flex items-center border cursor-pointer dark:border-stone-500 rounded-xl" @click="login()">
            <div @click="logout()">
              <icon :name="loggedIn ? 'close': 'user'"></icon>
            </div>
            <icon name="drag"/>
            <span class="font-bold hidden md:block px-1">{{ getUserName }}</span>
          </div>
        </client-only>
      </div>
    </div>
  </header>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import Search from "@/components/Search";

export default {
  name: "PHeader",
  components: {Search},
  props: {
    dark: {
      default: false
    }
  },
  data() {
    return {
      name: null
    }
  },
  methods: {
    ...mapActions('auth', [
      'login',
      'logout'
    ]),
    search() {
      if (!this.name) return;
      let x = this.name;
      if (x && x.includes(".eth")) {
        x.replace(".eth", "")
      }
      this.$router.push(`/?search=${x}`)
    }
  },
  computed: {
    ...mapGetters('auth', [
      'getUserName',
      'loggedIn'
    ])
  }
}
</script>

<style scoped>
</style>
