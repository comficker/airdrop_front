<template>
  <header class="px-4 -mx-4 pb-4">
    <div class="max-w-3xl mx-auto flex gap-4 items-center justify-between font-bold relative">
      <div class="md:-ml-6 flex-1 flex items-center gap-6">
        <nuxt-link class="w-32" to="/">
          <img :src="`/logo${dark ? '-dark': ''}.png`" alt="Ongoing Airdrop">
        </nuxt-link>
        <div class="md:hidden cursor-pointer" @click="showMobileMenu = !showMobileMenu">
          <icon :name="showMobileMenu ? 'close' : 'menu'"/>
        </div>
        <div
          class="md:relative absolute left-0 right-0 top-full pt-4 md:pt-0 z-10 md:block -mx-4 md:mx-0"
          :class="{'hidden': !showMobileMenu}"
        >
          <div class="flex-1 bg-white shadow md:shadow-none flex items-center gap-3 dark:bg-neutral-800 dark:border-stone-800 p-4 md:p-0 border md:border-none">
            <div class="flex flex-col md:flex-row gap-4 font-bold text-gray-500">
              <nuxt-link to="/" class="flex items-center gap-2">
                <div class="w-3 h-3 flex items-center justify-center rounded-full bg-green-400">
                  <div class="animate-ping w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span>Ongoing</span>
              </nuxt-link>
              <nuxt-link to="/upcoming" class="flex items-center gap-2">
                <icon name="clock" class="dark:fill-white"/>
                <span>Upcoming</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 flex gap-4 justify-end">
        <nuxt-link to="/earn" class="flex items-center items-center gap-2 text-gray-500">
          <icon name="cash" class="dark:fill-yellow-500"/>
          <span>Earn</span>
        </nuxt-link>
        <client-only>
          <div
            class="p-1 px-2 flex items-center border cursor-pointer dark:border-stone-500 rounded-xl text-gray-500"
            @click="login()"
          >
            <icon name="user"/>
            <icon name="drag"/>
            <span class="font-bold px-1">{{ getUserName }}</span>
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
    ]),
    search() {
      if (!this.name) return;
      let x = this.name;
      if (x && x.includes(".eth")) {
        x.replace(".eth", "")
      }
      this.$router.push(`/?search=${x}`)
    },
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
