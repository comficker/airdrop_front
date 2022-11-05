<template>
  <div
    class="border rounded bg-white dark:border-stone-800 dark:bg-neutral-900/50 hover:border-gray-200 dark:hover:border-stone-800 hover:shadow duration-200 p-3 group flex gap-3"
    :class="{'dark:md:border-transparent md:border-transparent': !highlight}"
  >
    <div class="flex-1 space-y-2">
      <div class="flex gap-3 text-xs">
        <template v-if="value">{{ dateFormat(value.date_start) }} UTC</template> <span class="text-red-400">{{ eventTimeStr(now, value) }}</span>
      </div>
      <div class="flex gap-4">
        <div class="text-xs flex-1 font-semibold space-y-2">
          <div class="font-bold a-line text-green-900 dark:text-white uppercase">
            <nuxt-link v-if="value" :to="`/event/${value.id_string}`">{{ value.title }}</nuxt-link>
          </div>
          <div class="flex gap-3">
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
          <div class="flex gap-3 items-center justify-between">
            <nuxt-link
              v-if="value && value.project" class="flex gap-2 items-center"
              :to="`/${value.project.id_string}`"
            >
              <div class="w-5">
                <img
                  v-if="value.project && value.project.media"
                  :src="`${$config.API_URI}${value.project.media.sizes['thumb_128']}`"
                  :alt="value.project.name"
                >
              </div>
              <span>{{value.project.name}}</span>
            </nuxt-link>
            <div class="cursor-pointer" @click="action('follow', value, handleAction)">
              <icon name="follow" :class="{'fill-green-500': is_following}"/>
            </div>
          </div>
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
