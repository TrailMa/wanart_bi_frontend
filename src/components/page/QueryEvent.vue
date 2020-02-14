<template>
  <div>
    <project-selector
      @selectProject="selectProject"
      ref="projectSelector"
    ></project-selector>

    <event-selector
      @selectEvent="selectEvent"
      :eventList="eventList"
    ></event-selector>

    <column-selector
      usage="分组"
      :columnList="columnList"
      ref="groupByColumnSelector"
    ></column-selector>

    <column-selector
      usage="去重"
      :columnList="columnList"
      ref="distinctColumnSelector"
    ></column-selector>

    <button @click="changeType">切换图表类型</button>
    <ve-chart :data="chartData" :settings="chartSettings"></ve-chart>
    <el-button type="primary" @click="queryData">查询</el-button>
  </div>
</template>

<script>
import qs from 'qs'
import chartDataPaser from '../../utils/chartDataPaser'
import ProjectSelector from '../common/ProjectSelector'
import EventSelector from '../common/EventSelector'
import ColumnSelector from '../common/ColumnSelector'

export default {
  name: 'QueryEvent',
  data() {
    this.typeArr = ['line', 'histogram', 'pie']
    this.index = 0

    return {
      dataList: [], // arrry of {groupId, value, time}
      chartData: {
        columns: ['time'],
        // 每个group是一列 如4010 4012，value为对应的值
        rows: [] // {'time':'2019-12-20 10:23:14', '4010':10, '4012':'15'}
      },
      eventList: [],
      columnList: [],
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
        // console.log(result.dataList)
        // console.log(this.chartData)
      } else {
        this.$message(result.msg)
      }
    },

    async queryEventList(project) {
      if (!project) {
        return
      }
      let result = await this.$axios.get('api/event/queryAll', {
        params: { project: project.name }
      })
      if (result.result == 1) {
        this.eventList = result.eventList
      } else {
        this.$message(result.msg)
      }
    },

    async queryColumnList(eventName) {
      let project = this.$refs.projectSelector.getCurProject()
      if (!project) {
        return
      }
      let result = await this.$axios.get('api/event/queryDetail', {
        params: { project: project.name, eventName }
      })
      if (result.result == 1) {
        console.log(result)
        this.columnList = result.eventColumnList
      } else {
        this.$message(result.msg)
      }
    },

    changeType() {
      this.index++
      if (this.index >= this.typeArr.length) {
        this.index = 0
      }
      this.chartSettings = { type: this.typeArr[this.index] }
    },

    selectProject(project) {
      console.log(project.desc + ' selected')
      this.queryEventList(project)
    },

    selectEvent(eventName) {
      console.log(eventName + ' selected')
      this.queryColumnList(eventName)
    }
  },

  components: {
    ProjectSelector,
    EventSelector,
    ColumnSelector
  }
}
</script>

<style scoped>
</style>