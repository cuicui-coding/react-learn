// 给定一个偶数长度的数组，其中不同的数字代表着不同种类的糖果，每一个数字代表一个糖果。你需要把这些糖果平均分给一个弟弟和一个妹妹，返回妹妹可以获得的最大糖果的种类数

const sugars = [2, 8, 7, 9, 9, 4, 2, 7, 8, 4, 7, 2]

var distributeCandies = function (candies) {
  let sisterSugars = []
  let brotherSugars = []
  let i = 0

  while (sisterSugars.length < candies.length / 2 && i < candies.length) {
    const sugar = candies[i]
    if (!sisterSugars.includes(sugar)) {
      sisterSugars.push(sugar)
    }
    i++
  }
  return sisterSugars.length
}
console.log(distributeCandies(sugars))
