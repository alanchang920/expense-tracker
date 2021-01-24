function translate(category) {
  switch (category) {
    case 'living':
      return '生活'
      break
    case 'traffic':
      return '交通'
      break
    case 'entertainment':
      return '娛樂'
      break
    case 'food':
      return '食物'
      break
    case 'others':
      return '其他'
      break
      return
  }
}

module.exports = translate