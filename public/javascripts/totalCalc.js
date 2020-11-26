function calcTotal(options) {
  let totalAmount = 0
  options.forEach((item) => {
    totalAmount += Number(item.amount)
  })

  return totalAmount
}

module.exports = calcTotal