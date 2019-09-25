let DateUtil={}
DateUtil.Week_CN = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
DateUtil.Both= function(n){
	return n.toString().replace(/^(\d)$/,"0$1")
}
DateUtil.toDate= function(ymd){
	return new Date( ymd.replace(/-/g, "/") )
}
DateUtil.toYmd= function(d){
	let year= d.getFullYear()
	let mon= d.getMonth()+1
	let day = d.getDate()
	return [year,this.Both(mon),this.Both(day)].join("-")
}
DateUtil.AfterSixty= function(d){
	d.setDate(d.getDate()+29)
	return d
}

DateUtil.PrevDay= function(d){
	d.setDate(d.getDate() - 1);
	return d
}

DateUtil.NextDay= function(d){
	d.setDate(d.getDate() + 1);
	return d
}

DateUtil.Week= function(d){
	return this.Week_CN[d.getDay()]
}

export default DateUtil;