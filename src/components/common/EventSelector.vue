<template>
  <el-select
    v-model="curEventName"
    :placeholder="usage"
    @change="onSelectEvent"
  >
    <el-option
      v-for="(item, index) in eventList"
      :key="index"
      :label="item"
      :value="index"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'EventSelector',
  props: {
    eventList: {
      type: Array,
      default() {
        return []
      }
    },
    usage: {
      type: String,
      default() {
        return '选择事件'
      }
    }
  },

  data() {
    return {
      curEventName: ''
    }
  },

  methods: {
    onSelectEvent(value) {
      // value 为 eventList的index
      this.curEventName = this.eventList[value]
      // 通知父组件 选择事件消息
      this.$emit('selectEvent', this.curEventName)
    },

    getCurEventName() {
      return this.curEventName
    },

    reset() {
      this.curEventName = ''
    }
  }
}
</script>

<style scoped>
</style>