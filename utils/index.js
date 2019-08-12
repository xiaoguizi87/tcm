function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

function insertLogDb(logType, params) {
  let openId = wx.getStorageSync('OPENID')
  console.log(logType)

  const db = wx.cloud.database()
  db.collection('studyLog').add({
    data: {
      logType: logType,
      params: JSON.stringify(params),
      time: new Date()
    }
  })
}

function getStudyLog() {
  let openId = wx.getStorageSync('OPENID')
  const db = wx.cloud.database()
  let logs = db.collection('studyLog').where({
    _openid: openId
  }).get().then(res => {
    // console.log(res.data[0])
    let t = []
    for (let i = 0; i < res.data.length; i++) {
      t.push(res.data[i].logType)
    }
    console.log(t)
    return t
  })  // console.log(typeof logs.data)
}

export default {
  formatNumber,
  formatTime,
  insertLogDb,
  getStudyLog
}
