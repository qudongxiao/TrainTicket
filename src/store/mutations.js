export default{
        changeStartCity (state, city){
            state.startCity= city
            try {
                localStorage.startCity= city 
            }catch (err){}
        },
        changeEndCity (state, city){
            state.endCity= city
            try {
                localStorage.endCity= city 
            }catch (err){}
        },
        changeDate (state, d){
            state._DATE_= d
            try {
                localStorage._DATE_= d
            }catch (err){}
        },

        changeTrainInfo (state, info){
            state.trainInfo= info
            try {
                localStorage.trainInfo= JSON.stringify(info)
            }catch (err){}
        },

        changeNameList (state, list){
            state.nameList= list
        },

        changeHSR (state, hsr){
            state.HSR= hsr
        },

        changeToken (state, token){
            state.accessToken= token
            try {
                localStorage.accessToken= token 
            }catch (err){}
        },
        changeLoading (state, showLoading){
            state.showLoading= showLoading
        },

        changeShowAlert(state,showAlert){
            state.showAlert = showAlert
        },
        changeAlertMsg(state,alertMsg){
            state.alertMsg= alertMsg
        }

}
