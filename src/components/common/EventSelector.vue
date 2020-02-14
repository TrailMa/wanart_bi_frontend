<template>
  <el-select
    v-model="curEventName"
    placeholder="选择事件"
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
    }
  }
}
</script>

<style scoped>
</style>