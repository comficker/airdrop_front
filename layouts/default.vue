<template>
  <div :class="{dark: dark}">
    <div class="py-6 px-4 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 min-h-screen fill-neutral-500 dark:fill-neutral-100">
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
        class="fixed font-semibold bottom-0 right-0 left-0 bg-white border-t text-xs text-gray-500 flex items-center dark:bg-neutral-800 dark:border-neutral-700 divide-x dark:divide-neutral-700">
        <div class="p-3 py-1 flex gap-2">
          <span>Copyright©2022</span>
          <span class="hidden md:block">ongoingairdrop.com</span>
        </div>
        <div class="p-3 py-1 flex space-x-3 fill-gray-500">
          <icon name="twitter"/>
          <icon name="discord" vb="128"/>
        </div>
        <div class="flex-1 flex justify-end fill-gray-500 items-center divide-x dark:divide-neutral-700">
          <template v-if="$store.state.auth.user">
            <nuxt-link class="p-3 py-1 cursor-pointer flex gap-2 items-center dark:fill-gray-500" :to="`/${path}?is_mine=true`">
              <icon name="note"/>
              <span class="hidden md:block">My posts</span>
            </nuxt-link>
            <nuxt-link class="p-3 py-1 cursor-pointer flex gap-2 items-center dark:fill-gray-500" :to="`/${path}?is_following=true`">
              <icon name="follow"/>
              <span class="hidden md:block">My following</span>
            </nuxt-link>
            <nuxt-link
              class="p-3 py-1 cursor-pointer flex gap-2 items-center dark:fill-gray-500"
              :to="`/${path}?is_joined=true`"
            >
              <icon name="check"/>
              <span class="hidden md:block">My Joined</span>
            </nuxt-link>
          </template>
          <nuxt-link class="p-3 py-1 cursor-pointer flex gap-2 items-center dark:text-white" to="/submit">
            <icon name="plus" class="dark:fill-white"/>
            <span>Submit</span>
          </nuxt-link>
          <div
            class="p-3 py-1 cursor-pointer"
            :class="{'fill-green-500': dark}"
            @click="dark = !dark">
            <icon name="sun"/>
          </div>
          <div
            v-if="$store.state.auth.user"
            class="p-3 py-1 cursor-pointer"
            @click="$auth.logout()">
            <icon name="out"/>
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
  computed: {
    path() {
      if (this.$route.name === 'event-page') {
        return ''
      }
      return this.$route.path
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
    if (this.$route.query.refer) {
      this.$ck.set('auth.referral_code', this.$route.query.refer, {
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
      })
    }
  }
}
</script>

<style>
main {
  min-height: calc(100vh - 98px);
}
</style>
