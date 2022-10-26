<template>
  <tippy ref="tippy" arrow interactive trigger="click" placement="bottom-start">
    <template v-slot:trigger>
      <div class="flex items-center gap-2" :class="triggerClass">
        <div class="flex-1">
          <input
            v-model="search"
            class="bg-transparent outline-none w-full" type="text"
            :placeholder="placeholder"
            @input="fetch"
          >
        </div>
        <div>
          <icon :name="isEnabled ? 'chevron-right': 'chevron-down'"></icon>
        </div>
      </div>
    </template>
    <div class="text-left">
      <div
        class="cursor-pointer p-1 cursor-pointer" v-for="(item, i) in response.results" :key="i"
        :class="{'text-green-500': ![false, -1].includes(isActive(item))}"
        @click="select(item)"
      >
        <span>{{ getName(item) }}</span>
      </div>
      <div
        v-if="search && !value"
        class="cursor-pointer p-1 flex gap-1 border dark:border-stone-900"
        @click="add"
      >
        <icon name="plus" class="dark:fill-white"></icon>
        <span>{{ search }}</span>
      </div>
    </div>
  </tippy>
</template>

<script>
import {debounce, cloneDeep} from "lodash";

export default {
  name: "DataSelect",
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Array, Object],
      default: null
    },
    module: {
      default: 'token',
      type: String
    },
    triggerClass: {},
    placeholder: {}
  },
  data() {
    let temp = this.value;
    if (this.multiple && !temp) {
      temp = []
    }
    return {
      temp: cloneDeep(temp),
      active: false,
      search: null,
      response: {
        results: [],
        count: 0
      }
    }
  },
  computed: {
    isEnabled() {
      return false
    }
  },
  watch: {
    value: {
      deep: true,
      handler: function () {
        let term = this.value;
        if (this.multiple && !term) {
          term = []
        }
        if (!this.multiple && !term) {
          this.search = null;
        }
        this.temp = cloneDeep(term);
      }
    }
  },
  methods: {
    getName(obj) {
      if (obj.symbol) {
        return obj.symbol
      }
      if (obj.title) {
        return obj.title
      }
      return obj.name
    },
    select(item) {
      const check = this.isActive(item);
      if (this.multiple) {
        if (check >= 0) {
          this.temp.splice(check, 1);
        } else {
          this.temp.push(item);
        }
      } else {
        if (check) {
          this.temp = null;
          this.search = null;
        } else {
          this.temp = item;
          this.search = this.getName(item);
        }
      }
      this.$emit('select', item);
      this.$emit('input', cloneDeep(this.temp));
    },
    isActive(item) {
      if (this.multiple) {
        return this.temp.map(x => x.id).indexOf(item.id);
      } else {
        return Boolean(this.temp && (this.temp.id === item.id));
      }
    },
    fetch: debounce(async function () {
      this.response = await this.$api[this.module].list({
        search: this.search,
        page_size: 5,
        page: 1
      })
    }, 800),
    add() {
      this.$api[this.module].create({
        name: this.search,
        symbol: this.search
      }).then(res => {
        this.response.results.unshift(res)
        this.select(res)
      })
    }
  },
  created() {
    this.fetch();
  }
}
</script>

<style scoped>

</style>
