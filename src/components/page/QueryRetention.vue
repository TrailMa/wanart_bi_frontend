<template>
  <div>
    <project-selector
      @selectProject="selectProject"
      ref="projectSelector"
    ></project-selector>

    <date-time-range-selector
      ref="dateTimeRangeSelector"
    ></date-time-range-selector>

    <common-selector
      usage="step"
      :options="stepList"
      ref="stepSelector"
    ></common-selector>

    <span>选择初始事件</span>
    <event-selector
      @selectEvent="selectFirstEvent"
      :eventList="eventList"
      usage="初始事件"
      ref="firstEventSelector"
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

    <condition-group
      :columnList="columnList"
      ref="conditionGroup"
    ></condition-group>

    <span>选择回访事件</span>
    <event-selector
      :eventList="eventList"
      usage="回访事件"
      ref="secondEventSelector"
    ></event-selector>

    <el-button @click="queryRetention"> 查询 </el-button>

    <el-table
      :data="retentionTable"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column
        v-for="(col, index) in retentionColumns"
        :key="index"
        :prop="col.prop"
        :label="col.label"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ProjectSelector from '../common/ProjectSelector'
import EventSelector from '../common/EventSelector'
import ColumnSelector from '../common/ColumnSelector'
import CommonSelector from '../common/CommonSelector'
import DateTimeSelector from '../common/DateTimeSelector'
import DateTimeRangeSelector from '../common/DateTimeRangeSelector'
import ConditionGroup from '../common/ConditionGroup'
import RetentionParser from '../../utils/retentionParser'

export default {
  name: 'QueryRetention',
  data() {
    return {
      eventList: [],
      curStep: 1,
      columnList: [],
      firstEventName: '',
      secondEventName: '',
      stepList: [
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
        { value: 7, label: 7 },
        { value: 14, label: 14 },
        { value: 30, label: 30 },
        { value: 60, label: 60 },
        { value: 90, label: 90 }
      ],

      retentionColumns: [],
      retentionTable: []
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

      this.firstEventName = ''
      this.secondEventName = ''
      this.$refs.dateTimeRangeSelector.reset()
      this.$refs.stepSelector.reset()
      this.resetEventParams()
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

    selectFirstEvent(eventName) {
      this.resetEventParams()
      this.queryColumnList(eventName)
    },

    resetEventParams() {
      // 重新选择事件后，重置事件选择相关参数
      this.columnList = []
      this.$refs.distinctColumnSelector.reset()
      this.$refs.groupByColumnSelector.reset()
      this.$refs.conditionGroup.reset()
    },

    async queryRetention() {
      let param = {
        project: this.$refs.projectSelector.getCurProject().name,
        startTime: this.$refs.dateTimeRangeSelector.getStartTime(),
        endTime: this.$refs.dateTimeRangeSelector.getEndTime(),
        steps: this.$refs.stepSelector.getSelectedValue(),
        firstEventName: this.$refs.firstEventSelector.getCurEventName(),
        distinct: this.$refs.distinctColumnSelector.getCurColumnName(),
        group: this.$refs.groupByColumnSelector.getCurColumnName(),
        conditionList: this.$refs.conditionGroup.getConditions(),
        secondEventName: this.$refs.secondEventSelector.getCurEventName()
      }
      let url = '/api/data/retention'
      let params = {
        retentionRequest: param
      }
      let result = await this.$axios.post(url, param)
      if (result.result == 1) {
        console.log(result)
        let tableData = RetentionParser.parseData(result)
        console.log(tableData)
        this.retentionColumns = tableData.columns
        this.retentionTable = tableData.rows
      } else {
        this.$message(result.msg)
      }
    }
  },
  components: {
    ProjectSelector,
    EventSelector,
    ColumnSelector,
    CommonSelector,
    DateTimeSelector,
    DateTimeRangeSelector,
    ConditionGroup
  }
}
</script>

<style scoped>
</style>