<template>
  <client-only>
    <div class="max-w-2xl mx-auto py-4 space-y-4">
      <div>
        <h1 class="font-bold uppercase flex space-x-2 items-center">
          <icon name="pen"></icon>
          <span>Submit</span>
        </h1>
        <p class="text-gray-500">Found a cool product you want everyone to know about? Or maybe you made one yourself
          and
          want the world to know about it? You're in the right place. So relax and follow the steps.
        </p>
      </div>
      <div class="border bg-white dark:bg-neutral-900 space-y-4 p-4 divide-y divide-dashed dark:divide-stone-700 dark:border-stone-800 rounded">
        <div class="space-y-3">
          <div class="font-bold flex space-x-2 items-center">
            <icon name="note"></icon>
            <span class="uppercase">Overview</span>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <data-select
                v-model="form.project"
                trigger-class="dark:bg-stone-800 border dark:border-0 p-2"
                placeholder="Host"
                module="project"
              />
            </div>
            <div
              v-tippy="{arrow: true, arrowType : 'round', placement: 'bottom-start'}"
              content="Airdrop, Retroactive, Free Mint..."
            >
              <input
                v-model="form.name"
                class="border dark:border-0 dark:bg-stone-800 outline-none p-2 w-full" type="text"
                placeholder="Kind"
              >
            </div>
          </div>
          <div class="flex gap-3 flex-wrap">
            <input-prize
              v-for="(item, i) in form.prizes"
              :key="i" :value="item"
              @input="form.prizes[i] = $event"
              @clear="form.prizes.splice(i, 1)"
            />
            <div
              class="flex gap-1 p-1.5 px-3 cursor-pointer items-center"
              @click="addPrize"
            >
              <icon name="plus"/>
              <span>Add prize</span>
            </div>
          </div>
        </div>
        <div class="space-y-4 pt-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="space-y-1">
              <div class="text-xs uppercase text-gray-500">Start date</div>
              <datetime-picker v-model="form.date_start"/>
            </div>
            <div class="space-y-1">
              <div class="text-xs uppercase text-gray-500">End date</div>
              <datetime-picker v-model="form.date_end"/>
            </div>
          </div>
        </div>
        <div class="space-y-3 pt-4">
          <h2 class="font-bold uppercase flex space-x-2 items-center">
            <icon name="tasks"></icon>
            <span>Tasks</span>
          </h2>
          <div class="flex border p-1 dark:border-0 dark:bg-stone-800">
            <input v-model="newTask" class="bg-transparent outline-none p-2 py-1.5 flex-1" type="text"
                   placeholder="todo">
            <div class="flex gap-1 p-1 px-3 cursor-pointer items-center" @click="addTask">
              <icon name="plus" class="sm"/>
              <span>Add task</span>
            </div>
          </div>
          <div v-for="(item, i) in form.tasks" :key="item" class="flex gap-2 items-center">
            <icon class="cursor-pointer" name="trash" @click="form.tasks.splice(i, 1)"/>
            <div>{{ item }}</div>
          </div>
        </div>
        <div class="space-y-3 pt-4">
          <h2 class="font-bold uppercase flex space-x-2 items-center">
            <icon name="note"></icon>
            <span>Additional</span>
          </h2>
          <input v-model="form.url" class="border dark:border-0 dark:bg-stone-800 outline-none p-2 w-full" type="text"
                 placeholder="Event Url">
          <input v-model="form.title" class="border dark:border-0 dark:bg-stone-800 outline-none p-2 w-full" type="text"
                 placeholder="Title">
          <textarea v-model="form.desc" class="border dark:border-0 dark:bg-stone-800 outline-none p-2 w-full"
                    placeholder="Description"></textarea>
        </div>
      </div>
      <div class="flex justify-end gap-4">
        <div
          class="flex gap-1 p-1.5 px-3 cursor-pointer items-center"
          @click="submit(true)"
        >
          <span>Draft</span>
        </div>
        <div
          class="flex gap-1 p-1.5 px-3 cursor-pointer items-center bg-green-600 text-white" @click="submit()"
        >
          <icon name="plus" class="fill-white"/>
          <span>Submit</span>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import DataSelect from "../components/DataSelect";
import InputPrize from "../components/Form/InputPrize";
import DatetimePicker from "../components/Form/DatetimePicker";
import {cloneDeep} from "lodash";
export default {
  name: "PageSubmit",
  components: {DatetimePicker, InputPrize, DataSelect},
  data() {
    return {
      newTask: null,
      form: {
        project: null,
        name: null,
        prizes: [],
        date_start: null,
        date_end: null,
        url: null,
        title: null,
        desc: null,
        term: null,
        media: null,
        tasks: [],
        properties: [],
      }
    }
  },
  computed: {
    fakeTitle() {
      const {project, name, prizes} = this.form
      const p = prizes.filter(x => Boolean(x.token)).map(x => `${x.value} ${x.token.symbol}`).join(",")
      return `${project ? project.name : '_'} ${name ? name : '_'} ${p}`
    }
  },
  methods: {
    addTask() {
      if (!this.newTask) return;
      this.form.tasks.push(this.newTask)
      this.newTask = null
    },
    addPrize() {
      this.form.prizes.push({
        token: null,
        value: 0,
        note: 0
      })
    },
    submit(is_draft) {
      const data = cloneDeep(this.form)
      const prizes = []
      if (data.project) {
        data.project = data.project.id
      }
      data.prizes.forEach(item => {
        if (item.token && item.value) {
          prizes.push({
            ...item,
            token: item.token.id,
          })
        }
      })
      this.$api.event.create({
        is_draft: is_draft,
        ...data,
        prizes
      }).then(res => {
        this.$router.push(`/event/${res.id_string}`)
      })
    }
  },
  watch: {
    fakeTitle(b, a) {
      if (a === this.form.title || !this.form.title) {
        this.form.title = b
      }
    }
  }
}
</script>

<style scoped>

</style>
