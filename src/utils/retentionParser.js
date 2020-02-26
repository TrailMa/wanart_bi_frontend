import TimeParser from './timeParser'
let rowId = 0
export default {
  parseData(response) {
    const steps = response.steps
    // table 列信息
    const columns = [{
        label: '初始事件发生时间',
        prop: 'createdTime'
      },
      {
        label: '分组',
        prop: 'groupId'
      },
      {
        label: '初始事件用户数',
        prop: 'firstCount'
      }
    ]
    // 留存列根据 查询的steps 动态变化
    for (let i = 1; i < steps; i++) {
      let column = {
        label: i + '日后',
        prop: 'day_' + i
      }
      columns.push(column)
    }

    // 处理行数据
    this.resetRowId()
    let rows = []
    for (let rowData of response.dataList) {
      if (!response.dataList) {
        continue
      }
      rows.push(this.parseRowData(rowData, steps))
    }
    let table = {
      columns,
      rows
    }
    return table
  },

  parseRowData(rowData, steps) {
    let baseRow = this.initOneRow(steps)
    baseRow.groupId = "总体"
    baseRow.children = []
    if (!rowData) {
      return baseRow
    }
    baseRow.createdTime = rowData.createdTime.split(" ")[0]
    let childrenMap = new Map()
    for (let data of rowData.dataList) {
      let groupId = data.groupId
      let deltaDays = TimeParser.getDaysBetween(rowData.createdTime, data.time)
      let key = 'day_' + deltaDays
      if (groupId == 0) {
        baseRow.firstCount = data.firstCount
        baseRow[key] = data.secondCount
      } else {
        let childRow = childrenMap.get(groupId)
        if (!childRow) {
          childRow = this.initOneRow(steps)
          childRow.groupId = groupId
          childRow.firstCount = data.firstCount
          childRow.createdTime = rowData.createdTime.split(" ")[0]
          childRow[key] = data.secondCount
          childrenMap.set(groupId, childRow)
        } else {
          childRow[key] = data.secondCount
        }
      }
    }

    // 将childrenMap转为arr 挂在baseRow下
    for (let child of childrenMap.values()) {
      baseRow.children.push(child)
    }
    return baseRow
  },

  initOneRow(steps) {
    let baseRow = {
      groupId: "",
      createdTime: "",
      firstCount: 0,
      id: this.getNextRowId()
    }
    for (let i = 1; i < steps; i++) {
      let key = 'day_' + i
      baseRow[key] = ""
    }
    return baseRow
  },

  resetRowId() {
    rowId = 0
  },
  getNextRowId() {
    return ++rowId
  }

}