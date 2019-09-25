import Util from '@/dateUtil'

let defaultStartCity= '出发地',
defaultEndCity="目的地",
defaultDate= Util.toYmd(new Date()),
defaultToken= 'JBPGYynYQlJgThurkwii5wYJKU%2BUpbhWaGT7jRkeTn6SUWrdF3OjOIw%2F1A9KVdAprCglWx40PFA0cUY%2B2oFEEcB4%2FPELxePkxiQHKfSpk3iPRDmNrvKIHdjLf0KtJJETJrxr52iMz29uT%2BAvuoZrB1kAK1iQaPjtnJgGvkMdQD4%3D',
defaultTrainInfo= {}
;

try{
    if(localStorage.startCity){
        defaultStartCity= localStorage.startCity
    }
    if(localStorage.endCity){
        defaultEndCity= localStorage.endCity
    }
    if(localStorage._DATE_){
        defaultDate= localStorage._DATE_
    }
    if(localStorage.accessToken){
        defaultToken= localStorage.accessToken
    }
  
    if(localStorage.trainInfo){
        defaultTrainInfo= JSON.parse(localStorage.trainInfo)
    }

} catch (err){}

console.log( 'min date===', Util.toDate(Util.toYmd(new Date()))  )
console.log( 'max date===', Util.AfterSixty(  Util.toDate(Util.toYmd(new Date()))  ))
export default{
    startCity: defaultStartCity,
    endCity: defaultEndCity,
    _DATE_: defaultDate,
    MinDate: Util.toDate(Util.toYmd(new Date())),
    MaxDate: Util.AfterSixty(  Util.toDate(Util.toYmd(new Date()))  ),
    HSR: false,
    showLoading: false,
    showAlert: false,
    alertMsg: '',
    accessToken:defaultToken,
    trainInfo:defaultTrainInfo,
    nameList:[],
    publicKey:'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpsfvIFh5hNTMfWWXQvCQ0WTWOIHdf8yQZu7IPxD9Ya0RSTPefZxDLxDCVmJE0M1PMVJA+KXSe8mIMz/JEZn/m5uHiiPSv+aZae1ZnnW5WYj6+Fa4xnE2Srz8ZLDoJh3Ph2FtUmprqR8nYFksfhI+eVZ2kUnygUmgWvHhWLb4+kQIDAQAB'
}