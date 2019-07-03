var canadianDollar = 0.76 // 1加元 = 0.76美元

function roundTwoDecimals(amount) {
  return Math.round(amount * 100) / 100 
}

exports.canadianToUS = function(canadian) {
  return roundTwoDecimals(canadian * canadianDollar)
}

exports.USToCanadian = function(us) {
  return roundTwoDecimals(us / canadianDollar)
}