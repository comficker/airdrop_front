<template>
  <div class="max-w-2xl mx-auto md:flex gap-4 divide-y md:divide-y-none md:divide-x dark:divide-stone-700">
    <div class="space-y-3 md:w-2/3 py-4">
      <div class="flex items-center justify-between">
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
        <div v-if="r1.results.length" class="flex items-center justify-center gap-3">
          <nuxt-link v-if="paginator.previous" :to="paginator.previous" class="cursor-pointer rounded-full dark:fill-white">
            <icon name="chevron-left" />
          </nuxt-link>
          <nuxt-link v-if="paginator.next" :to="paginator.next" class="cursor-pointer rounded-full dark:fill-white">
            <icon name="chevron-right" />
          </nuxt-link>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
        <event-card
          highlight
          v-for="item in r1.results" :key="item.id"
          :value="item"
          show-title
        />
      </div>
      <div v-if="r1.results.length" class="flex justify-between gap-3">
        <nuxt-link v-if="paginator.previous" :to="paginator.previous" class="flex items-center gap-1 items-center cursor-pointer rounded-full dark:fill-white">
          <icon name="chevron-left" />
          <span>Previous</span>
        </nuxt-link>
        <nuxt-link v-if="paginator.next" :to="paginator.next" class="flex items-center gap-1 items-center cursor-pointer rounded-full dark:fill-white">
          <span>Next</span>
          <icon name="chevron-right" />
        </nuxt-link>
      </div>
    </div>
    <div class="pt-4 pb-8 flex-1 space-y-3 divide-y dark:divide-stone-700 divide-dashed md:pl-4 sticky top-0">
      <div class="space-y-3">
        <h3 class="font-bold uppercase flex space-x-2 items-center">
          <icon name="drag"/>
          <span>Activity</span>
        </h3>
      </div>
      <div class="pt-4 space-y-3">
        <h3 class="font-bold uppercase flex space-x-2 items-center">
          <icon name="drag"/>
          <span>Project</span>
        </h3>
      </div>
      <div class="pt-4 space-y-3">
        <h3 class="font-bold uppercase flex space-x-2 items-center">
          <icon name="drag"/>
          <span>Hunter</span>
        </h3>
        <div class="grid grid-cols-10 md:grid-cols-5 gap-1">
          <div v-for="i in 20" :key="i">
            <img
              class="rounded"
              src="https://storage.googleapis.com/indie-hackers.appspot.com/avatars/300x300_z7OfFdmGGWROanM8KqZscSQ6dLi2.webp?1667236749115"
              alt="">
          </div>
        </div>
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
  watch: {
    "$route"() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.$fetch()
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
    ])
    this.r1 = r[0]
  }
}
</script>
