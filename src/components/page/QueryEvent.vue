<template>
  <div>
    <project-selector
      @selectProject="selectProject"
      ref="projectSelector"
    ></project-selector>

    <event-selector
      @selectEvent="selectEvent"
      :eventList="eventList"
      ref="eventSelector"
    ></event-selector>

    <column-selector
      usage="去重"
      :columnList="columnList"
      ref="distinctColumnSelector"
    ></column-selector>

    <column-selector
      usage="分组"
      :columnList="columnList"
      ref="groupByColumnSelector"
    ></column-selector>

    <separation-time-selector ref="separationTimeSelector">
    </separation-time-selector>

    <date-time-range-selector
      ref="dateTimeRangeSelector"
    ></date-time-range-selector>
    <condition-group
      :columnList="columnList"
      ref="conditionGroup"
    ></condition-group>

    <button @click="changeType">切换图表类型</button>
    <ve-chart :data="chartData" :settings="chartSettings"></ve-chart>
    <el-button type="primary" @click="queryData">查询</el-button>
  </div>
</template>

<script>
import qs from 'qs'
import chartDataPaser from '../../utils/chartDataParser'
import ProjectSelector from '../common/ProjectSelector'
import EventSelector from '../common/EventSelector'
import ColumnSelector from '../common/ColumnSelector'
import SeparationTimeSelector from '../common/SeparationTimeSelector'
import DateTimeRangeSelector from '../common/DateTimeRangeSelector'
import ConditionGroup from '../common/ConditionGroup'

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
        project: this.$refs.projectSelector.getCurProject().name,
        eventName: this.$refs.eventSelector.getCurEventName(),
        distinct: this.$refs.distinctColumnSelector.getCurColumnName(),
        group: this.$refs.groupByColumnSelector.getCurColumnName(),
        separationTime: this.$refs.separationTimeSelector.getCurSeparationTime(),
        startTime: this.$refs.dateTimeRangeSelector.getStartTime(),
        endTime: this.$refs.dateTimeRangeSelector.getEndTime(),
        conditionList: this.$refs.conditionGroup.getConditions()
      }
      let url = '/api/event/queryData'
      let params = {
        queryDataRequest: param
      }
      let result = await this.$axios.post(url, param)
      if (result.result == 1) {
        this.chartData = chartDataPaser.parseCommonDataList(result.dataList)
        if (this.chartData.rows.length == 0) {
          this.$message('当前查询无数据展示')
        }
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
      this.eventList = []
      this.$refs.eventSelector.reset()
      this.resetEventParams()
      this.queryEventList(project)
    },

    selectEvent(eventName) {
      this.resetEventParams()
      this.queryColumnList(eventName)
    },

    resetEventParams() {
      // 重新选择事件后，重置事件选择相关参数
      this.columnList = []
      this.$refs.distinctColumnSelector.reset()
      this.$refs.groupByColumnSelector.reset()
      this.$refs.separationTimeSelector.reset()
      this.$refs.dateTimeRangeSelector.reset()
      this.$refs.conditionGroup.reset()
    }
  },

  components: {
    ProjectSelector,
    EventSelector,
    ColumnSelector,
    SeparationTimeSelector,
    DateTimeRangeSelector,
    ConditionGroup
  }
}
</script>

<style scoped>
</style>