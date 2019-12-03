import { actions } from './balanceActions';
// import { payloadFormater } from '../utils/reduxFunctions';

const initialState = {
    data: {}
};


function balanceReducer(state = initialState, action = null) {
    switch (action.type) {
       case actions.STORE_ADDRESS_BALANCE:
           return {
               ...state,
                data: {
                    ...state.data,
                    [action.address]: action.balance
                }
           };
        default:            
            return state;
    }
}
export default balanceReducer;