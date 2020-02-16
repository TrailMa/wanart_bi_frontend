<template>
  <div class="block">
    <el-date-picker
      v-model="value"
      type="datetime"
      placeholder="选择日期时间"
      align="right"
      :picker-options="pickerOptions"
    >
    </el-date-picker>
  </div>
</template>

<script>
import timeParser from '../../utils/timeParser'
export default {
  name: 'DateTimeSelector',
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date(new Date().toLocaleDateString()))
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date(new Date().toLocaleDateString())
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date(new Date().toLocaleDateString())
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      value: ''
    }
  },

  methods: {
    getTime() {
      return timeParser.dateTimeToString(new Date(this.value))
    },

    reset() {
      this.value = new Date(new Date().toLocaleDateString())
    }
  }
}
</script>

<style scoped>
</style>