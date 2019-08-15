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
			time: db.serverDate()
		}
	})
}

async function getStudyLog() {
	let openId = wx.getStorageSync('OPENID')
	const db = wx.cloud.database()
	let res = await db.collection('studyLog').where({
		_openid: openId,
		"time": db.command.gte(db.serverDate({
			offset: -86400 * 7 * 1000
		}))
	}).get();
	let logs = []
	for (let i = 0; i < res.data.length; i++) {
		logs.unshift({
			logType: res.data[i].logType,
			time: formatTime(res.data[i].time)
		})
	}
	return logs
}

async function getStudyLogIn7Days() {
	let openId = wx.getStorageSync('OPENID')
	const db = wx.cloud.database()
	const _ = db.command
	console.log(openId)
	let res = await db.collection('studyLog').where({
		_openid: openId,
		"time": db.command.gte(db.serverDate({
			offset: -86400 * 7 * 1000
		}))

	}).get();
	let logs = []
	for (let i = 0; i < res.data.length; i++) {
		logs.unshift({
			logType: res.data[i].logType,
			time: formatTime(res.data[i].time)
		})
	}
	return logs
}

module.exports = {
	formatNumber,
	formatTime,
	insertLogDb,
	getStudyLog,
	getStudyLogIn7Days,
}
