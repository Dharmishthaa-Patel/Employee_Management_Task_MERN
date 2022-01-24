const initialState = {
    list : [],
    loading : false,
    templist :[]
}

export const reducers = ( state = initialState, action) => {

    switch(action.type){

        //Add User
        case "ADD_DATA" :
            return {
                ...state
            }
            
        //for deshboard with pagination
        case "GETDATA" :
            return {
                ...state,
                list : action.payload,
                loading : true            
            }

        case "EDITDATA" :
            return {
                ...state,
                templist : action.payload        
            }

        case "UPDATEDATA" :
            return {
                ...state,
                templist : action.payload          
            }
        
        case "DELETEDATA" :
            return {
                ...state,
                loading : false
            }

        case "LOGIN_USER":
            return {
                ...state,
                list : [action.payload],
                loading : true
            }
        
        case "LOGOUT" :
            return {
                ...state,
                loading : false
            }

        default:
            return state;
    }
}

export default reducers