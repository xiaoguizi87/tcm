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

async function getStudyLog() {
	let openId = wx.getStorageSync('OPENID')
	const db = wx.cloud.database()
	let res = await db.collection('studyLog').where({
		_openid: openId
	}).get();
	let logs = []
	for (let i = 0; i < res.data.length; i++) {
		logs.unshift({
			logType: res.data[i].logType,
			time: formatTime(res.data[i].time)
		})
	}
	// console.log(logs)
	return logs
}

async function getStudyLogIn7Days() {
	// var inputDate = new Date(myDate.toISOString());
	var inputDate = new Date();
	// MyModel.find({
	// 	'date': {
	// 		$lte: inputDate
	// 	}
	// })

	let openId = wx.getStorageSync('OPENID')
	console.log(inputDate)
	const db = wx.cloud.database()
	let res = await db.collection('studyLog').where({
		_openid: openId,
		time: {
			$lt: new Date(),
			$gte: new Date(new Date().setDate(new Date().getDate() - 1))
		}
	}).get();
	let logs = []
	for (let i = 0; i < res.data.length; i++) {
		logs.unshift({
			logType: res.data[i].logType,
			time: formatTime(res.data[i].time)
		})
	}
	// console.log(logs)
	return logs
}

module.exports = {
	formatNumber,
	formatTime,
	insertLogDb,
	getStudyLog,
	getStudyLogIn7Days,
}
