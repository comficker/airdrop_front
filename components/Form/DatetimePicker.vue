<template>
  <div class="flex gap-3">
    <input v-model="form.date" class="border dark:border-0 dark:bg-stone-800 outline-none p-2 flex-1" type="date">
    <input v-model="form.time" class="border dark:border-0 dark:bg-stone-800 outline-none p-2" type="time">
  </div>
</template>

<script>
export default {
  name: "DatetimePicker",
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      form: {
        date: null,
        time: "00:00"
      }
    }
  },
  methods: {
    sync(is_reverse) {
      if (is_reverse) {
        if (this.form.date && this.form.time) {
          this.$emit('input', `${this.form.date} ${this.form.time}`)
        }
      } else {
        if (this.value) {
          const arr = this.value.split("T")
          const arr2 = arr[1].split(":")
          this.form.date = arr[0]
          this.form.time = `${arr2[0]}:${arr2[1]}`
        }
      }
    },
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.sync(true)
      }
    }
  },
  created() {
    this.sync()
  }
}
</script>

