<template>
  <div>
    {{ usage }}
    <el-select v-model="value" @change="onSelect" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'CommonSelector',
  props: {
    options: {
      type: Array,
      default() {
        return [] // [{value:1, label: "show 1"}, {value:2, label: "show 2"}]
      }
    },

    usage: {
      type: String,
      default() {
        return ''
      }
    }
  },

  data() {
    return {
      value: ''
    }
  },

  methods: {
    onSelect(value) {
      this.$emit('onSelect', value)
    },

    getSelectedValue() {
      return this.value
    },

    reset() {
      this.value = ''
    }
  }
}
</script>