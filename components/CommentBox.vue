<template>
  <div class="space-y-3">
    <div class="flex text-xs uppercase font-bold gap-1 items-center text-gray-500">
      <icon name="comment"/>
      <div class="">Community feedback</div>
    </div>
    <div class="space-y-1.5">
      <textarea
        v-model="content"
        placeholder="Great!"
        class="p-3 text-sm border w-full shadow-inner dark:bg-neutral-700 dark:border-neutral-800 outline-none"
      />
      <div class="md:flex justify-between font-bold">
        <div class="flex space-x-3"></div>
        <div class="flex space-x-3 justify-between">
          <div class="flex justify-center space-x-1 items-center text-xs">
          </div>
          <div class="cursor-pointer px-6 p-2 bg-green-500 rounded-full text-white font-bold" @click="send">Send</div>
        </div>
      </div>
    </div>
    <div v-if="results.length" class="flow-root space-y-4">
      <ul role="list">
        <li v-for="(item, i) in results" :key="item.id">
          <div class="relative pb-6">
            <span
              v-if="i < results.length - 1"
              class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
            <div class="relative flex items-start space-x-3">
              <div>
                <div class="relative px-1">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                    <svg
                      class="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      fill="currentColor" aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                        clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="min-w-0 flex-1 py-1.5 text-xs">
                <div class=" text-gray-500">
                  <span class="font-medium text-gray-900">{{ item.user?.username || 'Anonymous' }}</span> said
                  <b
                    class="font-medium text-red-500"
                    :class="{'text-green-500': !item.is_down}"
                  >{{ item.is_down ? 'down' : 'up' }}</b>
                  <span class="whitespace-nowrap">{{ timeSince(item.created) }}</span>
                </div>
                <div v-if="item.content" class="mt-2 text-sm text-gray-700">
                  <p>{{ item.content }}</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentBox",
  props: {
    instance: {
      type: Object,
      default: null
    },
    results: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      content: null,
      is_down: true,
      location: {
        lat: 0,
        log: 0
      }
    }
  },
  computed: {
    hasLocate() {
      return Boolean(this.location.lat && this.location.log)
    }
  },
  methods: {
    send() {
      // this.$axios.$post('/app/reports/', {
      //   is_down: this.is_down,
      //   content: this.content,
      //   instance: this.instance.id,
      //   ...this.hasLocate ? this.location : {}
      // }).then((res) => {
      //   this.$emit('sent', res)
      // })
    }
  }
}
</script>
