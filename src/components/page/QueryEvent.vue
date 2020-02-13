<template>
  <div>
    <h2>this is query event page</h2>
    <button @click="changeType">切换图表类型</button>
    <ve-chart :data="chartData" :settings="chartSettings"></ve-chart>
    <el-button type="primary" @click="queryData">查询</el-button>
  </div>
</template>

<script>
import qs from 'qs'
import chartDataPaser from '../../utils/chartDataPaser'
export default {
  name: 'QueryEvent',
  data() {
    // this.chartExtend = {
    //   series: {
    //     smooth: false
    //   }
    // }

    this.typeArr = ['line', 'histogram', 'pie']
    this.index = 0

    return {
      dataList: [], // arrry of {groupId, value, time}
      chartData: {
        columns: ['time'],
        // 每个group是一列 如4010 4012，value为对应的值
        rows: [] // {'time':'2019-12-20 10:23:14', '4010':10, '4012':'15'}
      },
      chartSettings: { type: this.typeArr[this.index], smooth: false }
    }
  },

  methods: {
    async queryData() {
      let param = {
        project: 'dldl',
        eventName: 'login',
        distinct: 'uid',
        group: 'serverId',
        separationTime: 'day',
        startTime: '2019-12-20 00:00:00',
        endTime: '2019-12-26 23:10:20',
        conditionList: []
      }
      let url = '/api/event/queryData'
      let params = {
        queryDataRequest: param
      }
      let result = await this.$axios.post(url, param)
      if (result.result == 1) {
        this.chartData = chartDataPaser.parseCommonDataList(result.dataList)
        console.log(result.dataList)
        console.log(this.chartData)
      } else {
        this.$message(result.msg)
      }
    },

    changeType: function() {
      this.index++
      if (this.index >= this.typeArr.length) {
        this.index = 0
      }
      this.chartSettings = { type: this.typeArr[this.index] }
    }
  }
}
</script>

<style scoped>
</style>