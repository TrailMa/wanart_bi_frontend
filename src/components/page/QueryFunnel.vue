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
  </div>
</template>

<script>
import ProjectSelector from '../common/ProjectSelector'
import EventSelector from '../common/EventSelector'
import ColumnSelector from '../common/ColumnSelector'
import CommonSelector from '../common/CommonSelector'
import DateTimeSelector from '../common/DateTimeSelector'

export default {
  name: 'QueryFunnel',

  data() {
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

      curStep: 1
    }
  },

  methods: {
    selectProject(project) {
      this.reset()
      //this.queryEventList(project)
    },

    reset() {
      this.curStep = 1
      this.$refs.stepSelector.reset()
      this.$refs.dateTimeSelector.reset()
    },
    queryFunnel() {}
  },

  components: {
    ProjectSelector,
    EventSelector,
    ColumnSelector,
    CommonSelector,
    DateTimeSelector
  }
}
</script>