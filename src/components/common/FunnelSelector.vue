<template>
  <div>
    <event-selector
      @selectEvent="selectEvent"
      :eventList="eventList"
      ref="eventSelector"
    ></event-selector>

    <condition-group
      :columnList="columnList"
      ref="conditionGroup"
    ></condition-group>
  </div>
</template>

<script>
import EventSelector from './EventSelector'
import ConditionGroup from './ConditionGroup'

export default {
  name: 'FunnelSelector',

  props: {
    eventList: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {
      columnList: []
    }
  },

  methods: {
    getFunnel() {
      const eventName = this.$refs.eventSelector.getCurEventName()
      const conditionList = this.$refs.conditionGroup.getConditions()
      return { eventName, conditionList }
    },

    selectEvent(eventName) {
      this.reset()
      this.queryColumnList(eventName)
    },

    reset() {
      this.columnList = []
      this.$refs.conditionGroup.reset()
    },

    async queryColumnList(eventName) {
      let project = this.$store.state.curProject
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
    }
  },

  components: {
    EventSelector,
    ConditionGroup
  }
}
</script>

<style scoped>
</style>