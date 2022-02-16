const initialState = {
    //======== get data of authenticateUser
    userData: [],

    //======== For login status
    loginStatus: false,

    //======== for Country, State, City
    countryData: [],
    stateData: [],
    cityData: [],

    //======== For Pagination
    pageNumber: [],

    //======== Check LoginUser 
    LoginUser: '',

    //======== For DeleteUser & DeleteFile
    DeleteUser: false,

    //======== Check email is Exists 
    emailExist: false,

    //======== For RegisterToggle
    registerToggle: false,

    //======== Get UploadFile List
    getUploadFiles : [],

    //======== For Loader
    isLoading: false,

    //======== For UploadFile List Pagination
    filePageNo: []
}

export const reducers = (state = initialState, action) => {

    switch (action.type) {

        case "REGISTER_USER":
            return {
                ...state,
                registerToggle: true
            }
        
        case "REGISTER_TOGGLE":
            return {
                ...state,
                registerToggle: false
            }
        
        case "LOGIN_USER":
            return {
                ...state,
                loginStatus: true
            }
        
        case "GET_USER":
            return {
                ...state,
                userData: action.payload.empData,
                pageNumber: action.payload.totalPage,
                LoginUser: action.payload.LoginUser,
                emailExist: false,
                loginStatus: true
            }
        
        case "EDIT_USER":
            return {
                ...state
            }
        
        case "UPDATE_USER":
            return {
                ...state,
                emailExist: true
            }
        
        case "DELETE_USER":
            return {
                ...state,
                loginStatus: action.payload,
                DeleteUser: true,
                LoginUser: ''
            }
        
        case "LOGOUT_USER":
            return {
                ...state,
                loginStatus: false
            }
        case "COUNTRY":
            return {
                ...state,
                countryData: action.payload
            }
        case "STATE":
            return {
                ...state,
                stateData: action.payload
            }
        case "CITY":
            return {
                ...state,
                cityData: action.payload
            }
            
        case "CHECK_COOKIE":
            return {
                ...state,
                loginStatus: action.payload.loginStatus
            }

        case "GET_UPLOAD_FILE":
            return {
                ...state,
                getUploadFiles: action.payload.uploadData,
                filePageNo : action.payload.totalPage,
                DeleteUser : false,
                loginStatus : true
            }
            
        case "UPLOAD_FILE" :
            return {
                ...state,
                isLoading: false
            }

        case "LOADER": 
            return{
                ...state,
                isLoading: true
            }

        case "DELETEFILE":
            return{
                ...state,
                DeleteUser: true
            }

        case "DELETE_MULTIPLE_FILE":
            return{
                ...state,
                DeleteUser: true
            }

        default:
            return state
    }
}