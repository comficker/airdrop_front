<template>
  <div class="md:min-h-screen py-4">
    <div class="max-w-3xl mx-auto space-y-2">
      <div v-if="instance" class="flex gap-2 text-xs">
        <div class="w-4 h-4 flex justify-center items-center">
          <div class="w-3 h-3 flex items-center justify-center rounded-full bg-green-400 ring ring-green-200">
            <div class="animate-ping w-3 h-3 rounded-full bg-green-400"></div>
          </div>
        </div>
        <div class="text-gray-500">{{ eventTimeStr(now, instance) }}</div>
      </div>
      <h1
        class="text-4xl text-gray-800 font-bold dark:text-gray-300"
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
    <div class="max-w-3xl mx-auto">
      <div class="md:flex gap-4 h-full">
        <div class="flex-1 space-y-6 py-4 h-full">
          <div class="space-y-3" v-if="instance">
            <h2 class="font-bold uppercase flex space-x-2 items-center text-gray-500 text-xs">
              <icon name="tasks"></icon>
              <span>Tasks</span>
            </h2>
            <div
              v-for="(item, i) in instance.tasks" :key="i"
              class="flex gap-1 items-center font-semibold border dark:border-neutral-700 p-2 text-base"
            >
              <icon name="drag"/>
              <div>{{ item }}</div>
            </div>
          </div>
          <div class="p-3 border dark:border-neutral-700">
            <div class="font-bold uppercase flex justify-between items-center text-gray-500 text-xs mb-2">
              <div class="flex gap-2">
                <icon name="share"></icon>
                <span>Share with your friends</span>
              </div>
              <div v-if="referCode" class="flex gap-2">
                <input v-model="isIncludeRC" type="checkbox">
                <span>Include refer code</span>
              </div>
            </div>
            <textarea
              disabled
              :value="social.url"
              class="bg-neutral-100 dark:bg-neutral-700 text-sm outline-none p-2 py-2 flex-1 w-full" type="text"
              placeholder="todo"
            ></textarea>
            <div class="grid md:grid-cols-2 gap-2 text-center font-bold">
              <div class="">
                <ShareNetwork
                  class="block cursor-pointer w-full p-2 bg-gray-200 dark:bg-neutral-700 hover:bg-blue-500 hover:dark:bg-blue-500 text-gray-500 hover:text-white dark:text-gray-100 duration-300"
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
                  class="block cursor-pointer w-full p-2 bg-gray-200 dark:bg-neutral-700 hover:bg-blue-400 hover:dark:bg-blue-500 text-gray-500 hover:text-white dark:text-gray-100 duration-300"
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
          </div>
          <comment-box/>
        </div>
        <div class="md:pl-4 py-4 md:w-2/5 space-y-4 divide-y divide-dashed dark:divide-stone-800">
          <div v-if="instance" class="space-y-2">
            <h2 class="font-bold uppercase flex space-x-2 items-center text-gray-500 text-xs">
              <icon name="prize"></icon>
              <span>Reward</span>
            </h2>
            <template v-for="item in instance.prizes">
              <div class="flex gap-1 text-5xl font-bold">
                <span class="text-red-500">{{ item.value.toLocaleString() }}</span>
                <span class="text-gray-400">{{ symbol(item.token.symbol) }}</span>
              </div>
              <p class="text-xs text-gray-500">{{ item.note }}</p>
            </template>
          </div>
          <div class="pt-4 space-y-2">
            <h2 class="font-bold uppercase flex space-x-2 items-center text-gray-500 text-xs">
              <icon name="timeline"/>
              <span>Timeline</span>
            </h2>
            <div>
              <div class="text-xs text-gray-500">Start date</div>
              <div class="text-base font-semibold">
                <template v-if="instance">{{ dateFormat(instance.date_start) }} UTC</template>
              </div>
            </div>
            <div>
              <div class="text-xs text-gray-500">End date</div>
              <div class="text-base font-semibold">
                <template v-if="instance">{{ dateFormat(instance.date_end) }} UTC</template>
              </div>
            </div>
          </div>
          <div class="pt-4 space-y-2">
            <h2 class="font-bold uppercase flex space-x-2 items-center text-gray-500 text-xs">
              <icon name="business"/>
              <span>Organizer</span>
            </h2>
            <nuxt-link
              v-if="instance && instance.project" class="flex gap-2 items-center"
              :to="`/${instance.project.id_string}`"
            >
              <div class="w-6 h-6">
                <img
                  v-if="instance.project.media"
                  :src="`${$config.API_URI}${instance.project.media.sizes['thumb_128']}`"
                  :alt="instance.project.name"
                >
              </div>
              <div>{{ instance.project.name }}</div>
            </nuxt-link>
          </div>
          <div class="pt-4">
            <a
              v-if="instance" :href="`${instance.url}?source=ongoingairdrop.com`" target="_blank" rel="nofollow"
              class="flex gap-1 justify-center p-2 px-3 cursor-pointer items-center bg-green-600 text-white dark:fill-white fill-white w-full"
            >
              <icon name="join"></icon>
              <span>Join</span>
            </a>
          </div>
          <div class="pt-4 grid grid-cols-2 gap-4 font-semibold text-gray-500 dark:fill-gray-500">
            <div
              class="flex justify-center gap-1 p-1.5 px-3 cursor-pointer items-center border dark:border-neutral-700"
              :class="{'text-green-500': instance?.is_joined}"
              @click="action('join', instance, handleAction)"
            >
              <icon name="check" :class="{'fill-green-500': instance?.is_joined}"/>
              <icon name="drag"/>
              <span>{{ instance?.meta?.total_joined || 0 }}</span>
              <span class="hidden md:block">joined</span>
            </div>
            <div
              class="flex justify-center gap-1 p-1.5 px-3 cursor-pointer items-center border dark:border-neutral-700"
              :class="{'text-green-500': instance?.is_following}"
              @click="action('follow', instance, handleAction)"
            >
              <icon name="follow" :class="{'fill-green-500': instance?.is_following}"/>
              <icon name="drag"></icon>
              <span>{{ instance?.meta?.total_following || 0 }}</span>
              <span class="hidden md:block">followed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard";

export default {
  name: "PageIndex",
  components: {EventCard},
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
      },
      isIncludeRC: true
    }
  },
  async fetch() {
    const res = await Promise.all([
      this.$axios.$get(`/project/events/${this.$route.params.page}/`, {
        params: {
          refer_code: this.$ck.get('auth.referral_code')
        }
      }),
      this.$axios.$get(`/project/events/`, {
        params: {
          related: this.$route.params.page,
          page_size: 6
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
        desc: this.instance.desc,
      }
    },
    social() {
      let url = process.client ? window.location.href : ''
      if (this.isIncludeRC && this.referCode) {
        url = url + "?refer=" + this.referCode
      }
      return {
        title: this.meta.title + ' ' + (this.instance ? this.eventTimeStr(this.now, this.instance) : ''),
        desc: this.meta.desc,
        quote: this.instance?.desc,
        url: url,
        tags: `${this.instance?.name},Outage`
      }
    },
    referCode() {
      if (this.$store.state.auth.user && this.$store.state.auth.user.refer_code) {
        return this.$store.state.auth.user.refer_code
      }
      return null
    }
  },
  watch: {
    "$store.state.auth.user"() {
      this.$fetch()
    }
  },
  methods: {
    handleAction(tp, res) {
      if (!this.instance.meta) {
        this.instance.meta = {
          total_following: 0,
          total_joined: 0
        }
      }
      if (tp === 'follow') {
        this.instance.is_following = !this.instance.is_following
        this.instance.meta.total_following += (this.instance.is_following ? 1 : -1)
      } else if (tp === 'join') {
        this.instance.is_joined = !this.instance.is_joined
        this.instance.meta.total_joined += (this.instance.is_joined ? 1 : -1)
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.now = new Date()
    }, 1000)
  }
}
</script>

<style scoped>

</style>
