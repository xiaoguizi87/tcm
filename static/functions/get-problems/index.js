const cloud = require('./node_modules/wx-server-sdk')
var shuffle = require('./node_modules/lodash.shuffle')

cloud.init()

// 云函数入口函数
exports.main = async (event, data) => {
  const {OPENID} = cloud.getWXContext()
  const db = cloud.database()
  const problems = await db.collection('medicine').get()
  return {
    // data,
    problems: shuffle(problems.data).slice(0, 5),
    OPENID
  }
}
