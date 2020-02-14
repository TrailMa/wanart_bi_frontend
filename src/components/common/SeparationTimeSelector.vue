<template>
  <div>
    时间分隔
    <el-select
      v-model="curSeparationTime"
      placeholder="选择时间分隔"
      @change="onSelectSeparationTime"
    >
      <el-option
        v-for="(item, index) in timeSeparationList"
        :key="index"
        :label="item"
        :value="index"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'SeparationTimeSelector',

  data() {
    return {
      curSeparationTime: 'day',
      timeSeparationList: ['day', 'hour', 'minute']
    }
  },

  methods: {
    onSelectSeparationTime(value) {
      // value 为 columnList的index
      this.curSeparationTime = this.timeSeparationList[value]
    },

    getCurSeparationTime() {
      return this.curSeparationTime
    }
  }
}
</script>

<style scoped>
</style>