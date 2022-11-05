<template>
  <div class="max-w-2xl mx-auto md:flex gap-4">
    <div class="space-y-3 md:w-2/3 py-4">
      <div class="flex items-center justify-between">
        <div class="flex gap-4">
          <div v-if="r1.instance && r1.instance.media" class="w-10 h-10 md:w-20 md:h-20">
            <img
              :src="`${$config.API_URI}${r1.instance.media.sizes['thumb_128']}`"
              :alt="r1.instance.name"
            >
          </div>
          <div class="flex-1">
            <h2 class="font-bold uppercase flex space-x-2 items-center">
              <span v-if="!$route.params.page">Ongoing Airdrops</span>
              <span v-else-if="$route.params.page === 'upcoming'">Upcoming Airdrops</span>
              <span v-else-if="r1.instance">{{ r1.instance.name }} Airdrops</span>
            </h2>
            <p v-if="r1.instance" class="text-gray-500">{{r1.instance.desc}}</p>
          </div>
        </div>
        <div v-if="r1.results.length" class="flex items-center justify-center gap-3">
          <nuxt-link v-if="paginator.previous" :to="paginator.previous"
                     class="cursor-pointer rounded-full dark:fill-white">
            <icon name="chevron-left"/>
          </nuxt-link>
          <nuxt-link v-if="paginator.next" :to="paginator.next" class="cursor-pointer rounded-full dark:fill-white">
            <icon name="chevron-right"/>
          </nuxt-link>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-1 gap-3">
        <event-card
          highlight
          v-for="item in r1.results" :key="item.id"
          :value="item"
          show-title
        />
      </div>
      <div v-if="r1.results.length" class="flex justify-between gap-3">
        <nuxt-link
          v-if="paginator.previous" :to="paginator.previous"
          class="flex items-center gap-1 items-center cursor-pointer rounded-full dark:fill-white"
        >
          <icon name="chevron-left"/>
          <span>Previous</span>
        </nuxt-link>
        <nuxt-link
          v-if="paginator.next" :to="paginator.next"
          class="flex items-center gap-1 items-center cursor-pointer rounded-full dark:fill-white"
        >
          <span>Next</span>
          <icon name="chevron-right"/>
        </nuxt-link>
      </div>
    </div>
    <div class="pt-4 pb-8 flex-1 space-y-4 divide-y dark:divide-stone-700 divide-dashed md:pl-4 sticky top-0">
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
        <nuxt-link
          v-for="item in p.results" :key="item.id" class="flex gap-3 items-center"
          :to="`/${item.id_string}`"
        >
          <div class="w-6 h-6">
            <img
              v-if="item.media"
              :src="`${$config.API_URI}${item.media.sizes['thumb_128']}`"
              :alt="item.name"
              class="rounded"
            >
          </div>
          <div>{{ item.name }}</div>
        </nuxt-link>
      </div>
      <div class="pt-4 space-y-3">
        <h3 class="font-bold uppercase flex space-x-2 items-center">
          <icon name="drag"/>
          <span>Hunter</span>
        </h3>
        <div class="grid grid-cols-10 md:grid-cols-5 gap-1">
          <div v-for="i in 20" :key="i">
            <img
              class="rounded-full"
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
      },
      p: {
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
      window.scrollTo({top: 0, behavior: 'smooth'});
      this.$fetch()
    },
    "$store.state.auth.user"() {
      this.$fetch()
    }
  },
  async fetch() {
    const r = await Promise.all([
      this.$axios.$get('/project/events/', {
        params: {
          ...this.$route.query,
          ordering: 'time_diff',
          page_name: this.$route.params.page || 'ongoing',
          page: this.page,
          project: this.$route.params.page && this.$route.params.page !== "upcoming" ? this.$route.params.page : undefined
        }
      }),
      this.$axios.$get('/project/projects/', {
        params: {
          page_size: 6
        }
      }),
    ])
    this.r1 = r[0]
    this.p = r[1]
  }
}
</script>
