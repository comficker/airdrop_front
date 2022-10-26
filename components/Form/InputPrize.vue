<template>
  <div class="flex pr-2 cursor-pointer items-center border dark:border-gray-500 relative group">
    <data-select trigger-class="w-20 px-2 py-1.5" placeholder="USDT" module="token" v-model="form.token"/>
    <icon class="mx-1" name="drag"/>
    <input v-model="form.value" type="number" placeholder="0.0" class="bg-transparent w-24 outline-none mr-2">
    <tippy arrow interactive trigger="click" placement="bottom">
      <template v-slot:trigger>
        <icon name="note"/>
      </template>
      <div class="text-left">
        <textarea
          v-model="form.note" placeholder="Note, term, condition..."
          class="bg-transparent outline-none text-xs"
        />
      </div>
    </tippy>
    <span
      class="absolute rounded-full bg-red-500 p-1 -top-2.5 -right-2.5 opacity-0 group-hover:opacity-100 duration-200"
      @click="$emit('clear')"
    >
      <icon class="sm fill-white" name="close"></icon>
    </span>
  </div>
</template>

<script>
import DataSelect from "../DataSelect";

export default {
  name: "InputPrize",
  components: {DataSelect},
  props: {
    value: {}
  },
  data() {
    return {
      form: {
        token: null,
        value: 0,
        note: null
      }
    }
  },
  methods: {
    sync(is_reverse) {
      if (is_reverse) {
        this.$emit('input', this.form)
      } else {
        this.form.token = this.value?.token
        this.form.value = this.value?.value
        this.form.note = this.value?.note
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

<style scoped>

</style>
