<template>
  <div
    class="border rounded bg-white dark:border-stone-800 dark:bg-neutral-900/50 hover:border-gray-200 dark:hover:border-stone-800 duration-200 p-3 group flex gap-3"
    :class="{'dark:md:border-transparent md:border-transparent': !highlight}"
  >
    <div class="flex-1">
      <div class="flex gap-3 text-xs">
        <template v-if="value">{{ dateFormat(value.date_start) }} UTC</template>
      </div>
      <div class="flex gap-4">
        <div class="text-xs flex-1 font-semibold">
          <div class="font-bold text-base leading-4 my-1 a-line text-base text-green-900 dark:text-green-300">
            <nuxt-link v-if="value" :to="`/event/${value.id_string}`">{{ value.title }}</nuxt-link>
          </div>
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
        <div class="w-10">
          <img
            v-if="value && value.project && value.project.media"
            :src="`${$config.API_URI}${value.project.media.sizes['thumb_128']}`"
            :alt="value.project.name"
          >
        </div>
      </div>
      <div class="mt-2 flex text-xs gap-3 items-center">
        <div v-if="value" class="flex-1">
          <template>{{ eventTimeStr(now, value) }}</template>
        </div>
        <div class="p-1 cursor-pointer">
          <icon
            name="follow" :class="{'fill-green-500': is_following}"
            @click="action('follow', value, handleAction)"/>
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
