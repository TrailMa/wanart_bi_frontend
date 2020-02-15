// 数字类型可以参与的条件计算
const numberOperators = [{
    value: 'EQUAL',
    label: '等于'
  },
  {
    value: 'NOT_EQUAL',
    label: '不等于'
  },
  {
    value: 'GREATER',
    label: '大于'
  },
  {
    value: 'LESS',
    label: '小于'
  },
  {
    value: 'IN',
    label: 'IN'
  }
]

// 字符类型可以参与的条件运算
const charOperators = [{
    value: 'EQUAL',
    label: '等于'
  },
  {
    value: 'NOT_EQUAL',
    label: '不等于'
  },

  {
    value: 'CONTAIN',
    label: '包含'
  },
  {
    value: 'NOT_CONTAIN',
    label: '不包含'
  },
  {
    value: 'IN',
    label: 'IN'
  }
]

// 时间类型参数可以参与的条件运算
const timeOperators = [{
    value: 'EQUAL',
    label: '等于'
  },
  {
    value: 'NOT_EQUAL',
    label: '不等于'
  },
  {
    value: 'GREATER',
    label: '大于'
  },
  {
    value: 'LESS',
    label: '小于'
  },
]

const paramOperatorList = {
  "number": numberOperators,
  "char": charOperators,
  "time": timeOperators,
}

const combineList = [{
    value: "AND",
    label: "与"
  },
  {
    value: "OR",
    label: "或"
  }, {
    value: "NONE",
    label: ""
  }
]


export default {
  isNumberParam(paramType) {
    if (!paramType) {
      return false
    }
    return (paramType.indexOf("int") != -1 || paramType.indexOf("float") != -1 ||
      paramType.indexOf("real") != -1 || paramType.indexOf("double") != -1 ||
      paramType.indexOf("decimal") != -1 || paramType.indexOf("numeric") != -1)
  },

  isCharParam(paramType) {
    if (!paramType) {
      return false
    }
    return (paramType.indexOf("char") != -1)
  },


  isTimeParam(paramType) {
    if (!paramType) {
      return false
    }
    return (paramType.indexOf("time") != -1 || paramType.indexOf("date") != -1)
  },


  getParamOperators(paramType) {
    if (!paramType) {
      return []
    }

    if (this.isNumberParam(paramType)) {
      return paramOperatorList.number
    }

    if (this.isCharParam(paramType)) {
      return paramOperatorList.char
    }

    if (this.isTimeParam(paramType)) {
      return paramOperatorList.time
    }
  },

  getCombineList() {
    return combineList
  }
}