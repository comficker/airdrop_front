<template>
  <div class="md:min-h-screen py-4">
    <div class="max-w-3xl mx-auto space-y-4">
      <div class="space-y-2">
        <h1 class="font-semibold text-3xl">Earn</h1>
        <p class="text-gray-500">Got more credit by share airdrop event</p>
      </div>
      <div class="relative">
        <div class="border dark:border-stone-700 p-3">
          <div class="absolute bg-white dark:bg-stone-800 -top-2 px-3 text-xs font-bold uppercase left-4">Verification</div>
          <div v-if="isVerified" class="flex text-green-500 text-xl gap-2" :class="{'blur-sm': !isLogged}">
            <icon name="check" class="lg fill-green-500"/>
            <div class="">
              <div>Verified</div>
              <p class="text-xs text-gray-500">Your account eligible for earn from ongoingairdrop.com</p>
            </div>
          </div>
          <div v-else class="overflow-hidden" :class="{'blur-sm': !isLogged}">
            <div class="flow-root py-4 overflow-y-hidden -mb-8">
              <ul role="list">
                <li>
                  <div class="relative pb-4">
                    <span class="absolute top-5 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div class="relative flex items-start space-x-3">
                      <div>
                        <div class="relative px-1">
                          <div
                            class="flex h-6 w-6 items-center justify-center rounded-full ring-6 ring-white dark:ring-stone-800"
                            :class="{
                              'bg-green-500': profile && profile.refer_code,
                              'bg-gray-100': !(profile && profile.refer_code)
                            }"
                          >
                            <icon name="check" class="fill-white dark:fill-stone-800"/>
                          </div>
                        </div>
                      </div>
                      <div class="min-w-0 flex-1 py-1 space-y-2">
                        <div class="text-sm text-gray-500 dark:text-gray-200 flex justify-between">
                          <span>Create referral code</span>
                        </div>
                        <input
                          :disabled="profile && profile.refer_code"
                          v-model="refer_code"
                          class="dark:bg-stone-900 outline-none p-2 py-2 flex-1 w-full" type="text"
                          placeholder="todo"
                        >
                        <div
                          v-if="!(profile && profile.refer_code)"
                          class="rounded bg-green-500 text-white inline-flex gap-1 p-1 px-3 cursor-pointer items-center"
                          @click="submitCode">
                          <span>Submit</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li v-for="item in verification_list" :key="item.id">
                  <div class="relative pb-4">
                    <span class="absolute top-5 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div class="relative flex items-center space-x-3">
                      <div>
                        <div class="relative px-1">
                          <div
                            class="flex h-6 w-6 items-center justify-center rounded-full ring-6 ring-white dark:ring-stone-800"
                            :class="{
                              'bg-green-500': countVal(item.id) >= item.target,
                              'bg-gray-100': countVal(item.id) < item.target
                            }"
                          >
                            <icon name="check" class="fill-white dark:fill-stone-800"/>
                          </div>
                        </div>
                      </div>
                      <div class="min-w-0 flex-1 py-1">
                        <div class="text-gray-500 dark:text-gray-200 flex justify-between">
                          <span>{{ item.title }}</span>
                          <span class="font-semibold text-xs">{{ countVal(item.id) }}/{{ item.target }}</span>
                        </div>
                        <p class="text-xs text-gray-500" v-if="item.help">{{ item.help }}</p>
                        <div v-if="item.id === 'invite_friend'">
                          <input
                            disabled
                            :value="url"
                            class="mt-2 dark:bg-stone-900 outline-none p-2 py-2 flex-1 w-full text-gray-500" type="text"
                            placeholder="todo"
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-if="!isLogged" class="absolute inset-0 flex items-center justify-center z-10">
          <div class="space-y-4">
            <icon name="protect" class="xl"/>
            <div
              class="p-1 px-2 flex items-center border cursor-pointer dark:border-stone-500 rounded-xl"
              @click="login()"
            >
              <span class="font-bold px-1">Login to access</span>
            </div>
          </div>
        </div>
      </div>
      <template v-if="isLogged">
        <div class="text-center">
          <div>Balance</div>
          <div class="text-6xl text-green-500 font-bold">{{ formatNum(profile?.credits) || 0 }}</div>
          <div>
            <span class="underline text-gray-500">Claim</span>
          </div>
        </div>
        <table class="table-fixed w-full divide-y dark:divide-stone-700 text-xs">
          <thead>
          <tr class="text-gray-500">
            <th scope="col" class="py-1.5 text-left">Action</th>
            <th scope="col" class="py-1.5 text-center">Earned</th>
            <th scope="col" class="py-1.5 text-right">Timestamp</th>
          </tr>
          </thead>
          <tbody class="divide-y dark:divide-stone-700 divide-dashed">
          <tr v-for="item in transaction.results" :key="item.id">
            <td class="py-1.5 text-left">{{ item.action_name }}</td>
            <td class="py-1.5 text-center">{{ item.value }}</td>
            <td class="py-1.5 text-right">{{ dateFormat(item.created) }}</td>
          </tr>
          </tbody>
        </table>
      </template>
      <div v-else class="space-y-2">
        <div class="font-bold uppercase flex space-x-2 items-center text-gray-500 text-xs">
          <icon name="prize"/>
          <span>Top by earned</span>
        </div>
        <table class="table-fixed w-full divide-y dark:divide-stone-700">
          <thead>
          <tr class="text-gray-500">
            <th scope="col" class="py-1.5 text-left">Id</th>
            <th scope="col" class="py-1.5 text-left">Username</th>
            <th scope="col" class="py-1.5 text-right">Balance</th>
          </tr>
          </thead>
          <tbody class="divide-y dark:divide-stone-700 divide-dashed">
          <tr v-for="(item, i) in topEarn.results" :key="item.id">
            <td class="py-1.5 text-left">#{{ i + 1 }}</td>
            <td class="py-1.5 text-left">{{ item.user.username }}</td>
            <td class="py-1.5 text-right">{{ formatNum(item.credits) }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "EarnPage",
  head() {
    return {
      title: "Earn with ongoingairdrop.com"
    }
  },
  data() {
    return {
      refer_code: null,
      profile: null,
      topEarn: {
        results: []
      },
      transaction: {
        results: []
      }
    }
  },
  computed: {
    url() {
      let url = process.client ? window.location.href : ''
      url = url + "?refer=" + this.refer_code
      return url
    },
    isVerified() {
      return false
    },
    isLogged() {
      return !!this.$store.state.auth.user
    },
    verification_list() {
      return [
        {
          id: "create_event",
          title: "Create an event",
          target: 1
        },
        {
          id: "follow_event",
          title: "Follow 5 events",
          target: 5
        },
        {
          id: "join_event",
          title: "Join 5 events",
          target: 5
        },
        {
          id: "invite_friend",
          title: "Invite a friend",
          target: 1
        },
        {
          id: "invite_view",
          title: "Share an event to 5 friends",
          target: 5,
          help: "Share your favorite event to your friends with refer code"
        }
      ]
    }
  },
  methods: {
    ...mapActions('auth', [
      'login',
    ]),
    async fetchProfile() {
      if (this.isLogged) {
        let profile = 0
        if (this.$store.state.auth.user) {
          profile = this.$store.state.auth.user.id
        }
        this.profile = await this.$axios.$get(`/auth/profiles/${profile}/`).catch(() => null)
        if (this.profile) {
          this.refer_code = this.profile.refer_code
        }
      }
    },
    async fetchTransaction() {
      if (this.isLogged) {
        this.transaction = await this.$axios.$get('/auth/transactions/', {
          params: {
            profile: this.$store.state.auth.user.id
          }
        }).catch(() => ({
          results: []
        }))
      }
    },
    async fetchProfiles() {
      if (!this.isLogged) {
        this.topEarn = await this.$axios.$get('/auth/profiles/', {
          params: {
            ordering: 'credits'
          }
        }).catch(() => ({
          results: []
        }))
      }
    },
    submitCode() {
      if (this.refer_code && this.$store.state.auth.user) {
        this.$axios.$post('/auth/referral-code', {
          referral_code: this.refer_code
        }).then(() => {
          this.fetchProfile()
        }).catch(() => {
        })
      }
    },
    countVal(flag) {
      if (this.profile && this.profile.achievements) {
        return this.profile.achievements[flag]
      }
      return 0
    },
    formatNum(number) {
      if (!number) return 0
      return Number.parseFloat(number.toFixed(3)).toLocaleString()
    }
  },
  mounted() {
    this.fetchProfile()
    this.fetchTransaction()
    this.fetchProfiles()
  },
  watch: {
    isLogged() {
      this.fetchProfile()
      this.fetchTransaction()
      this.fetchProfiles()
    }
  }
}
</script>
