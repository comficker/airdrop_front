<template>
  <div
    class="border dark:border-stone-900 dark:md:border-transparent md:border-transparent hover:border-gray-200 dark:hover:border-stone-900 duration-200 p-3 group flex gap-3">
    <div class="flex flex-col text-xs">
      <div class="p-1 cursor-pointer">
        <icon name="follow"></icon>
      </div>
      <div class="p-1 cursor-pointer">
        <icon name="join"></icon>
      </div>
    </div>
    <div class="flex-1">
      <div class="flex gap-3 text-xs">
        <div class="">{{ dateFormat(value.date_start) }} UTC</div>
        <div class="text-red-500">{{ eventTimeStr(now, value.date_start, value.date_end) }}</div>
      </div>
      <div class="flex justify-between">
        <div class="text-xs font-semibold">
          <div class="font-bold text-base leading-4 my-1">
            <nuxt-link :to="`/event/${value.id_string}`">{{ value.title }}</nuxt-link>
          </div>
          <div class="flex gap-1">
            <icon class="sm" name="prize"></icon>
            <template v-for="item in value.prizes">
              <span class="text-red-500">{{ item.value.toLocaleString() }}</span>
              <span class="text-gray-400">{{ item.token.symbol }}</span>
            </template>
            <span v-if="value.prizes.length === 0">0</span>
          </div>
          <div class="flex gap-1">
            <icon class="sm" name="tasks"></icon>
            <span class="text-red-500">{{ value.total_task }}</span>
            <span class="text-gray-400">tasks</span>
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
    value: {}
  },
  data() {
    return {
      now: new Date()
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
