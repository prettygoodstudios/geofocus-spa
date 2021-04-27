export const SET_USER = 'SET_USER';
export const SET_LOCATION = 'SET_LOCATION';

export const reducer = (state: any, {type, payload} : {type: string, payload: any}) => {
    switch(type){
        case SET_USER:
            return {
                ...state,
                user: payload,
                loaded: true
            }
        case SET_LOCATION:
            return  {
                ...state,
                location: payload
            }
        default:
            return {
                ...state
            }
    }
}

