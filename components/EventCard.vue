<template>
  <div
    class="border border-gray-100 dark:border-stone-800 dark:bg-neutral-900/50 hover:border-gray-200 dark:hover:border-stone-800 duration-200 group flex"
    :class="{'dark:md:border-transparent md:border-transparent': !highlight}"
  >
    <div class="m-4 w-24 h-24 flex items-center justify-center bg-gray-100 dark:bg-neutral-900">
      <img
        v-if="value.project && value.project.media"
        :src="`${$config.API_URI}${value.project.media.sizes['thumb_128']}`"
        :alt="value.project.name"
      >
      <icon v-else name="thumb"/>
    </div>
    <div class="p-4 pl-0 flex-1">
      <div class="flex gap-3 text-xs">
        <span class="text-red-400">{{ eventTimeStr(now, value) }}</span>
      </div>
      <div class="flex gap-4">
        <div class="flex-1 space-y-1">
          <div class="font-semibold a-line text-gray-800 dark:text-gray-100 text-base">
            <nuxt-link v-if="value" :to="`/event/${value.id_string}`">{{ value.title }}</nuxt-link>
          </div>
          <div>
            <nuxt-link
              v-if="value && value.project" class="a-line text-gray-400 uppercase text-xs font-semibold"
              :to="`/${value.project.id_string}`"
            >
              <span>{{value.project.name}}</span>
            </nuxt-link>
          </div>
          <div class="text-xs flex gap-3">
            <div v-if="value" class="flex gap-1">
              <icon class="sm" name="prize"></icon>
              <template v-for="item in value.prizes">
                <span class="text-red-500">{{ item.value.toLocaleString() }}</span>
                <span class="text-gray-400">{{ symbol(item.token.symbol) }}</span>
              </template>
              <span v-if="value.prizes.length === 0">0</span>
            </div>
            <div class="flex gap-1">
              <icon class="sm" name="tasks"></icon>
              <span class="text-red-500">{{ value?.total_task || 0 }}</span>
              <span class="text-gray-400">tasks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-4 w-40 border-l border-gray-100 dark:border-neutral-800 space-y-1">
      <div v-if="value">
        <div class="text-gray-500 text-xs">Start</div>
        <div class="font-semibold">{{ dateFormat(value.date_start) }}</div>
        <div class="text-gray-500 text-xs mt-1">End</div>
        <div class="font-semibold">{{ dateFormat(value.date_end) }}</div>
      </div>
      <div class="text-xs flex gap-3 items-center">
        <div class="cursor-pointer" @click="action('follow', value, handleAction)">
          <icon name="follow" :class="{'fill-green-500': is_following}"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    value: {},
    showTitle: {
      default: false,
      type: Boolean
    },
    highlight: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      now: new Date(),
      is_following: this.value?.is_following || false
    }
  },
  watch: {
    value() {
      this.is_following = this.value?.is_following || false
    }
  },
  mounted() {
    setInterval(() => {
      this.now = new Date()
    }, 1000)
  },
  methods: {
    handleAction(tp, res) {
      this.is_following = !this.is_following
    }
  }
}
</script>

<style scoped>

</style>
