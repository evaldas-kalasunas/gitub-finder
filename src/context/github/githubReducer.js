import {
    SEARCH_USERS,
    GET_USER,
    CLEAR_USERS,
    GET_REPOS,
    SET_LOADING
} from '../types'

export default (state, action) => {
    switch(action.type) {
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case GET_USER: 
            return {
                ...state,
                user: action.payload
            }
        case CLEAR_USERS:
            return {
                ...state,
                users: []
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        
        default: 
            return state
    }
}