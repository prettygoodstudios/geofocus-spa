export const SET_USER = 'SET_USER';

export const reducer = (state: any, {type, payload} : {type: string, payload: any}) => {
    switch(type){
        case SET_USER:
            return {
                ...state,
                user: payload
            }
        default:
            return {
                ...state
            }
    }
}

