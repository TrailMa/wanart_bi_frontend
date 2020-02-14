<template>
  <div>
    {{ usage }}
    <el-select
      v-model="curColumnName"
      placeholder="选择列名"
      @change="onSelectColumn"
    >
      <el-option
        v-for="(item, index) in columnList"
        :key="index"
        :label="item.columnName"
        :value="index"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'ColumnSelector',
  props: {
    columnList: {
      type: Array,
      default() {
        return [] // [{columnName:id, columnType:int}]
      }
    },
    usage: {
      type: String,
      default() {
        '未知用途'
      }
    }
  },

  computed: {},

  data() {
    return {
      curColumnName: '',
      curColumnIndex: 0
    }
  },

  methods: {
    onSelectColumn(value) {
      // value 为 columnList的index
      this.curColumnIndex = value
      this.curColumnName = this.columnList[value].columnName
    },

    getCurColumn() {
      return this.columnList[curColumnIndex]
    }
  }
}
</script>

<style scoped>
</style>