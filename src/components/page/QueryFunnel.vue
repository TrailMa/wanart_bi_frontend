<template>
  <div>
    <project-selector
      @selectProject="selectProject"
      ref="projectSelector"
    ></project-selector>

    <date-time-selector ref="dateTimeSelector"></date-time-selector>

    <common-selector
      usage="step"
      :options="stepList"
      ref="stepSelector"
    ></common-selector>

    <funnel-group :eventList="eventList" ref="funnelGroup"></funnel-group>

    <el-button type="primary" @click="queryFunnel">查询</el-button>
    <el-button v-if="useNumSettings" @click="changeChartShow"
      >计算百分比</el-button
    >
    <el-button v-else @click="changeChartShow"> 展示数值 </el-button>
    <ve-funnel :data="chartData" :settings="chartSettings"></ve-funnel>
  </div>
</template>

<script>
import ProjectSelector from '../common/ProjectSelector'
import EventSelector from '../common/EventSelector'
import ColumnSelector from '../common/ColumnSelector'
import CommonSelector from '../common/CommonSelector'
import DateTimeSelector from '../common/DateTimeSelector'
import FunnelGroup from '../common/FunnelGroup'

import calculate from '../../utils/calculate'

export default {
  name: 'QueryFunnel',

  data() {
    this.chartNumSettings = {
      dimension: 'eventName',
      metrics: 'value'
    }

    this.chartPercentSettings = {
      dimension: 'eventName',
      metrics: 'percent',
      dataType: 'percent',
      digit: 4
    }
    return {
      stepList: [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
        { value: 7, label: 7 }
      ],

      curStep: 1,
      eventList: [],

      // chart 相关
      chartData: {
        columns: ['eventName', 'percent', 'value'],
        rows: []
      },

      chartSettings: this.chartNumSettings,
      useNumSettings: true
    }
  },

  methods: {
    selectProject(project) {
      this.reset()
      this.queryEventList(project)
    },

    reset() {
      this.curStep = 1
      this.eventList = []
      this.chartData.rows = []
      this.$refs.stepSelector.reset()
      this.$refs.dateTimeSelector.reset()
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

    async queryFunnel() {
      let project = this.$store.state.curProject.name
      let steps = this.$refs.stepSelector.getSelectedValue()
      let startTime = this.$refs.dateTimeSelector.getTime()
      let funnelQueryList = this.$refs.funnelGroup.getFunnels()
      let param = { project, steps, startTime, funnelQueryList }

      let url = '/api/funnel/query'
      let params = {
        queryFunnelRequest: param
      }
      let result = await this.$axios.post(url, param)
      if (result.result == 1) {
        const length = result.funnelResultList.length
        for (let i = 0; i < length; i++) {
          let curData = result.funnelResultList[i]
          if (i == 0) {
            curData['percent'] = 1
          } else {
            let preData = result.funnelResultList[i - 1]
            curData['percent'] = calculate.toPercent(
              curData.value,
              preData.value
            )
          }
        }
        this.chartData.rows = result.funnelResultList
      } else {
        this.$message(result.msg)
      }
    },

    changeChartShow() {
      this.useNumSettings = !this.useNumSettings
      if (this.useNumSettings) {
        this.chartSettings = this.chartNumSettings
      } else {
        this.chartSettings = this.chartPercentSettings
      }
    }
  },

  components: {
    ProjectSelector,
    EventSelector,
    ColumnSelector,
    CommonSelector,
    DateTimeSelector,

    FunnelGroup
  }
}
</script>