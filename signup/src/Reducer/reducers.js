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
            console.log("getdata",action.payload);
            return {
                ...state,
                list : action.payload,
                loading : true            
            }
        
        //sorting
        case "ASC_ORDER":
            return{
                ...state,
                list : action.payload
            }

        case "DSC_ORDER":
            return{
                ...state,
                list : action.payload
            }
        
        //searching
        case "SEARCH":
            console.log("search",action.payload);
            return{
                ...state,
                list : action.payload
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