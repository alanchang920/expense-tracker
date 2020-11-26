function getIcon(category) {
  let icon = ''
  switch (category) {
    case 'homeExpense':
      icon = "<i class='fas fa-home'></i>"
      break
    case 'transport':
      icon = "<i class='fas fa-shuttle-van'></i>"
      break
    case 'entertainment':
      icon = "<i class='fas fa-grin-beam'></i>"
      break
    case 'food':
      icon = "<i class='fas fa-utensils'></i>"
      break
    case 'other':
      icon = "<i class='fas fa-pen'></i>"
      break
  }
  return icon
}

module.exports = getIcon