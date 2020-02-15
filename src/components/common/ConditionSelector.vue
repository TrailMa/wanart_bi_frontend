<template>
  <div>
    <column-selector
      usage="条件"
      :columnList="columnList"
      @onSelect="onColumnSelect"
      ref="columnSelector"
    ></column-selector>

    <common-selector
      usage="选择操作符"
      :options="operatorList"
      @onSelect="onOperatorSelect"
      ref="operatorSelector"
    ></common-selector>

    <div v-if="paramIsTimeType">
      <date-time-selector ref="dateTimeSelector"></date-time-selector>
    </div>
    <div v-else>
      <el-input placeholder="请输入内容" v-model="inputParam" clearable>
      </el-input>
    </div>

    <common-selector
      usage="连接关系"
      :options="combineList"
      @onSelect="onCombineSelect"
      ref="combineSelector"
    >
    </common-selector>
  </div>
</template>

<script>
import ColumnSelector from './ColumnSelector'
import CommonSelector from './CommonSelector'
import ConditionOperators from '../../utils/conditionOperator'
import DateTimeSelector from './DateTimeSelector'

export default {
  name: 'ConditionSelector',
  props: {
    columnList: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {
      curColumn: {},
      curOperator: 'INVALID_OPERATOR',
      curParam: '',
      curCombine: 'NONE',

      combineList: ConditionOperators.getCombineList(),
      operatorList: [],

      inputParam: '',
      timeParam: ''
    }
  },
  computed: {
    paramIsTimeType() {
      return (
        this.curColumn &&
        ConditionOperators.isTimeParam(this.curColumn.columnType)
      )
    }
  },

  components: {
    ColumnSelector,
    CommonSelector,
    DateTimeSelector
  },

  methods: {
    onColumnSelect(column) {
      if (!column || this.curColumn == column) {
        return
      }
      // todo Operator清空
      this.curColumn = column

      this.operatorList = ConditionOperators.getParamOperators(
        column.columnType
      )
    },

    onOperatorSelect(value) {
      this.curOperator = value
    },

    onCombineSelect(value) {
      this.curCombine = value
    },

    getCondition() {
      let columnName = this.curColumn.columnName
      let conditionOperator = this.curOperator
      let conditionParam = ''
      if (this.paramIsTimeType) {
        conditionParam = this.$refs.dateTimeSelector.getTime()
      } else {
        conditionParam = this.inputParam
      }
      let combineType = this.curCombine == '' ? 'NONE' : this.curCombine
      return { columnName, conditionOperator, conditionParam, combineType }
    }
  }
}
</script>

<style scoped>
</style>