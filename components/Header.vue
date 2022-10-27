<template>
  <header>
    <div class="max-w-2xl mx-auto flex gap-4 items-center justify-between font-bold relative">
      <div class="flex-1 flex items-center gap-6">
        <nuxt-link class="w-32" to="/">
          <img :src="`/logo${dark ? '-dark': ''}.png`" alt="Ongoing Airdrop">
        </nuxt-link>
        <div class="md:hidden cursor-pointer" @click="showMobileMenu = !showMobileMenu">
          <icon :name="showMobileMenu ? 'close' : 'menu'"/>
        </div>
        <div
          class="md:relative absolute left-0 right-0 top-full pt-4 md:pt-0 z-10 md:block"
          :class="{'hidden': !showMobileMenu}"
        >
          <div class="flex-1 flex items-center gap-3 bg-white dark:bg-black dark:border-stone-800 p-4 md:p-0 border md:border-none">
            <div class="flex flex-col md:flex-row  gap-4 font-bold text-gray-500">
              <nuxt-link to="/" class="flex items-center gap-2">
                <div class="w-3 h-3 flex items-center justify-center rounded-full bg-green-400">
                  <div class="animate-ping w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span>Ongoing</span>
              </nuxt-link>
              <nuxt-link to="/upcoming">Upcoming</nuxt-link>
              <nuxt-link to="/submit">Submit</nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 flex justify-end">
        <client-only>
          <div
            class="p-1 px-2 flex items-center border cursor-pointer dark:border-stone-500 rounded-xl"
            @click="login()"
          >
            <div @click="logout()">
              <icon :name="loggedIn ? 'close': 'user'"></icon>
            </div>
            <span class="hidden md:block">
              <icon name="drag"/>
            </span>
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
      name: null,
      showMobileMenu: false
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
