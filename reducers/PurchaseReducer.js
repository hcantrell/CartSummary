import { GET_PRICING } from '../actions/Types';
import { getPricingData } from '../api/Data';

const initialState = {
    value: {
        pricing: {
            subtotal: 0,
            savings: 0,
            discount: 0,
            tax: 0,
            total: 0,
            zip: ''
        },
        itemDetails: {
            item_name: '',
            quantity: 0
        }
    }
};

const purchaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRICING:
            return {
                ...state,
                value: action.payload
            };
        default:
            return state;
    }
};

export default purchaseReducer;

export const loadPurchase = (promoCode) => dispatch => {
    getPricingData(promoCode).then((data) => {
        dispatch({
            type: GET_PRICING,
            payload: data
        });
    });
}
