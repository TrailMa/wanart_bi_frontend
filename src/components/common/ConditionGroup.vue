<template>
  <div>
    <condition-selector
      v-for="(item, index) in conditionList"
      :key="index"
      :columnList="columnList"
      ref="conditionList"
    >
    </condition-selector>
    <el-button type="primary" icon="el-icon-plus" @click="addCondition"
      >添加</el-button
    >
  </div>
</template>

<script>
import ConditionSelector from './ConditionSelector'
export default {
  name: 'ConditionGroup',
  data() {
    return {
      conditionList: []
    }
  },
  props: {
    columnList: {
      Type: Array,
      default() {
        return []
      }
    }
  },

  components: {
    ConditionSelector
  },

  methods: {
    getConditions() {
      let conditions = []
      if (!this.$refs.conditionList) {
        return conditions
      }
      for (let conditionRef of this.$refs.conditionList) {
        conditions.push(conditionRef.getCondition())
      }
      return conditions
    },
    addCondition() {
      this.conditionList.push(this.conditionList.length)
    }
  }
}
</script>

<style scoped>
</style>