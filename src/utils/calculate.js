export default {
  toPercent(num, total) {
    if (!total || total == 0) {
      return 0
    }
    return (num / total).toFixed(4)
  }
}