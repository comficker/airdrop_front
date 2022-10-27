<template>
  <div :class="{dark: dark}">
    <div class="py-8 px-4 dark:bg-black dark:text-white min-h-screen dark:fill-gray-500">
      <p-header :dark="dark"/>
      <div class="content-wrapper">
        <div class="main-wrapper">
          <div class="flex-1">
            <nuxt/>
          </div>
        </div>
      </div>
      <adapter/>
      <div
        class="fixed bottom-0 right-0 left-0 bg-white border-t divide-x text-xs text-gray-500 flex items-center dark:bg-black dark:border-stone-900 dark:divide-stone-900">
        <div class="p-3 py-1">Copyright © 2022 ongoingairdrop.com</div>
        <div class="p-3 py-1 flex space-x-3 fill-gray-500">
          <icon name="twitter"/>
          <icon name="discord" vb="128"/>
        </div>
        <div class="flex-1 flex justify-end fill-gray-500 items-center">
          <div
            class="p-3 py-1 cursor-pointer"
            :class="{'fill-green-500': dark}"
            @click="dark = !dark">
            <icon name="sun"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Adapter from "../components/Modal/Adapter";
import PHeader from "../components/Header";

export default {
  name: "LayoutDefault",
  components: {PHeader, Adapter},
  head() {
    return {
      title: "Upcoming Airdrops",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "desc"
        },
        {
          property: 'og:title',
          hid: 'og:title',
          name: 'og:title',
          content: 'Upcoming Airdrops | upcomingairdrops.com',
        },
        {
          property: 'og:description',
          hid: 'og:description',
          name: 'og:description',
          content: 'Is something down for everyone or just me? Check your favorite services are down or having problems.',
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        }
      ],
    }
  },
  data() {
    return {
      dark: this.$ck.get("darkmode")
    }
  },
  methods: {
    switch() {
      if (this.dark) {
        document.body.classList.add('dark')
      } else {
        document.body.classList.remove('dark')
      }
    }
  },
  watch: {
    dark() {
      this.$ck.set("darkmode", this.dark)
      this.switch()
    }
  },
  mounted() {
    this.switch()
  }
}
</script>

<style>
main {
  min-height: calc(100vh - 98px);
}
</style>
