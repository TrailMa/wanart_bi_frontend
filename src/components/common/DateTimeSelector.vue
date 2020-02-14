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
export default {
  name: 'DateTimeSelector',
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
      return this.dateTimeToString(start, 'YYYY-mm-dd HH:MM:SS')
    },
    getEndTime() {
      const start = this.value[1]
      return this.dateTimeToString(start, 'YYYY-mm-dd HH:MM:SS')
    },

    dateTimeToString(date, fmt) {
      let ret
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
        ).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
          )
        }
      }
      return fmt
    }
  }
}
</script>

<style scoped>
</style>