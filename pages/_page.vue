<template>
  <div class="max-w-2xl mx-auto py-8 space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:-mx-10 lg:-mx-32">
      <event-card v-for="item in r2.results" :key="item.id_string" :value="item" highlight/>
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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <event-card
          highlight
          v-for="item in r1.results" :key="item.id"
          :value="item"
          show-title
        />
      </div>
      <div v-if="this.r1.results.length" class="flex items-center justify-center gap-3">
        <nuxt-link v-if="paginator.previous" :to="paginator.previous" class="cursor-pointer rounded-full">
          <icon class="lg" name="chevron-left" />
        </nuxt-link>
        <nuxt-link v-if="paginator.next" :to="paginator.next" class="cursor-pointer rounded-full">
          <icon class="lg" name="chevron-right" />
        </nuxt-link>
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
        count: 0,
        num_pages: 0
      },
      r2: {
        results: [],
        count: 0,
        num_pages: 0
      }
    }
  },
  computed: {
    page() {
      return Number.parseInt(this.$route.query.page || "1")
    },
    paginator() {
      const query = this.$route.query || {}
      let next, previous
      if (this.page < this.r1.num_pages) {
        next = new URLSearchParams({
          ...query,
          page: this.page + 1
        }).toString()
      }
      if (this.page > 1) {
        previous = new URLSearchParams({
          ...query,
          page: this.page - 1
        }).toString()
      }
      return {
        next: next ? `/?${next}` : undefined,
        previous: previous ? `/?${previous}` : undefined,
      }
    }
  },
  async fetch() {
    const endpoint = '/project/events/'
    const r = await Promise.all([
      this.$axios.$get(endpoint, {
        params: {
          ordering: 'relevance,time_diff',
          page: this.page,
          project: this.$route.query.project
        }
      }),
      this.$axios.$get(endpoint, {
        params: {
          page_size: 3
        }
      })
    ])
    this.r1 = r[0]
    this.r2 = r[1]
  }
}
</script>
