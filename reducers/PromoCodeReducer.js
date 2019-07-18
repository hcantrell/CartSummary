import { PROMO_CODE } from '../actions/Types';

const initialState = {
    value: ''
};

const promoCodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROMO_CODE:
            return {
                ...state,
                value: action.payload
            };
        default:
            return state;
    }
}

export default promoCodeReducer;

export const promoCodeChange = (promoCode) => dispatch => {
    dispatch({
        type: PROMO_CODE,
        payload: promoCode
    });
};
