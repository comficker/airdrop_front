<template>
  <div class="space-y-6 py-4 md:py-8">
    <div class="max-w-2xl mx-auto space-y-2">
      <div v-if="instance" class="flex gap-3 text-xs">
        <div class="">{{ dateFormat(instance.date_start) }} UTC</div>
        <div class="text-gray-500">{{ eventTimeStr(now, instance) }}</div>
      </div>
      <h1
        class="text-5xl text-green-900 font-extrabold dark:text-green-300"
        :class="{'h-10 w-32 bg-gray-200 dark:bg-stone-900 animate-pulse mb-2': !instance}"
        :style="!instance ? {width: `45%`} : undefined"
      >
        <template v-if="instance">{{ instance.title }}</template>
      </h1>
      <p
        class="text-sm text-gray-400"
        :class="{'h-4 w-64 bg-gray-200 dark:bg-stone-900 animate-pulse': !instance}"
      >
        <template v-if="instance">{{ instance.desc }}</template>
      </p>
    </div>
    <div class="max-w-2xl mx-auto space-y-4 divide-y divide-dashed dark:divide-stone-900">
      <div v-if="instance" class="space-y-2">
        <h2 class="font-bold uppercase flex space-x-2 items-center text-gray-500">
          <icon name="prize"></icon>
          <span>Reward</span>
        </h2>
        <template v-for="item in instance.prizes">
          <div class="flex gap-1 text-3xl">
            <span class="text-red-500">{{ item.value.toLocaleString() }}</span>
            <span class="text-gray-400">{{ item.token.symbol }}</span>
          </div>
          <p class="text-xs text-gray-500">{{ item.note }}</p>
        </template>
      </div>
      <div v-if="instance" class="pt-4 space-y-2">
        <h2 class="font-bold uppercase flex space-x-2 items-center text-gray-500">
          <icon name="tasks"></icon>
          <span>Tasks</span>
        </h2>
        <div v-for="(item, i) in instance.tasks" :key="i" class="flex gap-2 items-center">
          <icon name="check"></icon>
          <div>{{ item }}</div>
        </div>
      </div>
      <div class="pt-4 flex gap-4">
        <a
          v-if="instance" :href="instance.url" target="_blank" rel="nofollow"
          class="flex gap-1 p-1.5 px-3 cursor-pointer items-center bg-green-600 text-white dark:fill-white"
        >
          <icon name="join"></icon>
          <span>Join</span>
        </a>
        <div
          class="flex gap-1 p-1.5 px-3 cursor-pointer items-center border dark:border-gray-500"
          @click="action('join', instance)"
          content="Coming soon" v-tippy='{ arrow: true }'
        >
          <span>I'm done</span>
          <icon name="drag"></icon>
          <span>0</span>
        </div>
        <div
          class="flex gap-1 p-1.5 px-3 cursor-pointer items-center border dark:border-gray-500"
          @click="action('follow', instance)"
          content="Coming soon" v-tippy='{ arrow: true }'
        >
          <icon name="follow"></icon>
          <span>follow</span>
          <icon name="drag"></icon>
          <span>0</span>
        </div>
      </div>
      <div class="pt-4 grid md:grid-cols-2 gap-4 text-center font-bold">
        <div class="">
          <ShareNetwork
            class="block cursor-pointer w-full p-2 bg-blue-500 rounded text-white"
            network="facebook"
            :url="social.url"
            :title="social.title"
            :description="social.desc"
            :quote="social.quote"
            :hashtags="social.tags"
          >
            Share on facebook
          </ShareNetwork>
        </div>
        <div class="">
          <ShareNetwork
            class="block cursor-pointer w-full p-2 bg-blue-400 rounded text-white"
            network="twitter"
            :url="social.url"
            :title="social.title"
            :description="social.desc"
            :quote="social.quote"
            :hashtags="social.tags"
          >
            Share on twitter
          </ShareNetwork>
        </div>
      </div>
      <div class="pt-4 space-y-2">
        <h2 class="font-bold uppercase flex space-x-2 items-center text-gray-500">
          <icon name="drag"/>
          <span>Check also</span>
        </h2>
        <div class="flex gap-1.5 flex-col text-green-700">
          <nuxt-link
            v-for="(item, i) in res.results"
            :key="i"
            class="flex items-center py-1 space-x-1"
            :to="`/event/${item?.id_string}`"
          >
            <div
              class="w-3 h-3"
              :class="{'bg-gray-200 dark:bg-stone-900 animate-pulse': !item}"
            >
              <img
                v-if="item"
                :src="item.external_ico"
                alt=""
              >
            </div>
            <div
              class="px-2 font-bold"
              :class="{'h-3 w-36 bg-gray-200 dark:bg-stone-900 animate-pulse': !item}"
            >
              <span v-if="item">{{ item.title }}</span>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    const fr = new Date()
    const to = new Date()
    fr.setMonth(to.getMonth() - 1)
    fr.setZero()
    to.setZero()
    return {
      fr,
      to,
      instance: null,
      results: [],
      query: {
        page: 1,
        instance__id_string: this.$route.params.page,
        page_size: 5,
        created_after: fr.normalize(),
        created_before: to.normalize()
      },
      now: new Date(),
      res: {
        results: [null, null, null, null, null],
        count: 0
      }
    }
  },
  async fetch() {
    const res = await Promise.all([
      this.$axios.$get(`/project/events/${this.$route.params.page}/`),
      this.$axios.$get(`/project/events/`, {
        params: {
          related: this.$route.params.page,
          page_size: 5
        }
      })
    ])
    this.instance = res[0]
    this.res = res[1]
  },
  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.meta.desc,
        },
        {
          property: 'og:title',
          hid: 'og:title',
          name: 'og:title',
          content: this.meta.title,
        },
        {
          property: 'og:description',
          hid: 'og:description',
          name: 'og:description',
          content: this.meta.desc,
        },
      ]
    }
  },
  computed: {
    meta() {
      if (!this.instance) return {
        title: 'Something happens',
        desc: ''
      }
      return {
        title: this.instance.title,
        desc: this.instance.desc
      }
    },
    social() {
      return {
        title: this.meta.title + ' ' + (this.instance ? this.eventTimeStr(this.now, this.instance) : ''),
        desc: this.meta.desc,
        quote: this.instance?.desc,
        url: process.client ? window.location.href : '',
        tags: `${this.instance?.name},Outage`
      }
    }
  },
  methods: {},
  mounted() {
    setInterval(() => {
      this.now = new Date()
    }, 1000)
  }
}
</script>

<style scoped>

</style>
