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
  data() {
    return {
      curEventName: '',
      eventList: []
    }
  },

  methods: {
    onSelectEvent(value) {
      // value 为 eventList的index
      this.curEventName = this.eventList[value]
    },

    async queryEventList(project) {
      if (!project) {
        return
      }
      if (project) {
        let result = await this.$axios.get('api/event/queryAll', {
          params: { project: project.name }
        })
        if (result.result == 1) {
          this.eventList = result.eventList
        } else {
          this.$message(result.msg)
        }
      }
    }
  }
}
</script>

<style scoped>
</style>