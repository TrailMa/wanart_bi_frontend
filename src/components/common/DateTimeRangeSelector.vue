<template>
  <div class="block">
    时间范围
    <el-date-picker
      v-model="value"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      align="right"
    >
    </el-date-picker>
  </div>
</template>

<script>
import timeParser from '../../utils/timeParser'
export default {
  name: 'DateTimeRangeSelector',
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date().toLocaleDateString())
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date().toLocaleDateString())
              start.setTime(start.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date().toLocaleDateString())
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近30天',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date().toLocaleDateString())
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近90天',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date().toLocaleDateString())
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value: [new Date(new Date().toLocaleDateString()), new Date()]
    }
  },

  methods: {
    getStartTime() {
      const start = this.value[0]
      return timeParser.dateTimeToString(start, 'YYYY-MM-dd hh:mm:ss')
    },
    getEndTime() {
      const end = this.value[1]
      return timeParser.dateTimeToString(end, 'YYYY-MM-dd hh:mm:ss')
    }
  }
}
</script>

<style scoped>
</style>