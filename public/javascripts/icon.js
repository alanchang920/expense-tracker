function generateIcon(category) {
  switch (category) {
    case 'living':
      return 'fas fa-home'
      break
    case 'traffic':
      return 'fas fa-shuttle-van'
      break
    case 'entertainment':
      return 'fas fa-grin-beam'
      break
    case 'food':
      return 'fas fa-utensils'
      break
    case 'others':
      return 'fas fa-pen'
      break
  }
}

module.exports = generateIcon