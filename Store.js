import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import purchaseReducer from './reducers/PurchaseReducer';
import promoCodeReducer from './reducers/PromoCodeReducer';

const rootReducer = combineReducers({
    purchases: purchaseReducer,
    promoCode: promoCodeReducer
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;
