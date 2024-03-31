
const initialState = {
    token:null,
    userid:null
}

export default (state=initialState, action) => {
    switch (action.type) {
        case 'SIGNUP':
            console.log(action.token)
            return {
                token: action.payload.token,
                userid: action.payload.userid
            }

        case 'LOGIN':
            return{
                token: action.payload.token,
                userid: action.payload.userid
            }
        default:
            return state;
    }
}