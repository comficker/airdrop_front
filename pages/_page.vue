<template>
  <div class="max-w-2xl mx-auto py-8 space-y-4">
    <div class="grid grid-cols-2 gap-4 md:-mx-6">
      <event-card v-for="item in r2.results" :key="item.id_string" :value="item"/>
    </div>
    <div class="space-y-3">
      <h2 class="font-bold uppercase flex space-x-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="feather feather-chevron-right"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <span>Ongoing Airdrops</span>
      </h2>
      <div class="grid grid-cols-1 md:gap-0 gap-4">
        <event-card
          v-for="item in r1.results" :key="item.id"
          :value="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EventCard from "../components/EventCard";
export default {
  name: 'IndexPage',
  components: {EventCard},
  data() {
    return {
      r1: {
        results: [],
        count: 0
      },
      r2: {
        results: [],
        count: 0
      }
    }
  },
  async fetch() {
    const endpoint = '/project/events/'
    const r = await Promise.all([
      this.$axios.$get(endpoint, {
        params: {
          page_size: 12,
          ordering: '-last_check'
        }
      }),
      this.$axios.$get(endpoint, {
        params: {
          page_size: 2,
          ordering: '-today_report'
        }
      })
    ])
    this.r1 = r[0]
    this.r2 = r[1]
  }
}
</script>
