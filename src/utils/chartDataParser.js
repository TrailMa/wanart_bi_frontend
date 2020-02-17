export default {
  parseCommonDataList(dataList) {
    let chartData = {
      columns: ['time'],
      rows: [],
    }
    if (!dataList) {
      return chartData
    }

    const groupIdSet = new Set()
    const rowMap = new Map()
    for (let data of dataList) {
      let groupId = data.groupId
      let time = data.time
      let value = data.value

      // 保存所有groupId对应的column
      if (!groupIdSet.has(groupId)) {
        groupIdSet.add(groupId)
        chartData.columns.push(groupId)
      }

      // 根据time 保存数据
      let rowData = rowMap.get(time)
      if (!rowData) {
        rowData = {
          time
        }
        rowData[groupId] = value
        rowMap.set(time, rowData)
      } else {
        rowData[groupId] = value
      }

    }

    let values = rowMap.values()
    for (let value of values) {
      chartData.rows.push(value)
    }

    return chartData
  },

}