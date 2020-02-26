export default {
  dateTimeToString(date, fmt) {
    if (!fmt) {
      fmt = 'YYYY-MM-dd hh:mm:ss'
    }
    let ret
    const opt = {
      'Y+': date.getFullYear().toString(), // 年
      'M+': (date.getMonth() + 1 < 10 ?
        '0' + (date.getMonth() + 1) :
        date.getMonth() + 1
      ).toString(), // 月
      'd+': date.getDate().toString(), // 日
      'h+': date.getHours().toString(), // 时
      'm+': date.getMinutes().toString(), // 分
      's+': date.getSeconds().toString() // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }
    for (let k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt)
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
        )
      }
    }
    return fmt
  },

  stringToDate(timeStr) {
    timeStr = timeStr.replace(/-/g, "/");
    return new Date(timeStr);
  },

  isSameDay(date1, date2) {
    return date1.getFullYear() == data2.getFullYear() &&
      date1.getMonth() == date2.getMonth() &&
      date1.getDate() == date2.getDate()
  },

  getDaysBetween(dateStr1, dateStr2) {
    let date1 = this.stringToDate(dateStr1)
    let date2 = this.stringToDate(dateStr2)
    let dateSpan = date2 - date1;
    dateSpan = Math.abs(dateSpan);
    return Math.floor(dateSpan / (24 * 3600 * 1000));
  }
}