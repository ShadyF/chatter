import * as types from '../actions/action-types'

const initialState = 'Anonymous';

export default function (state = initialState, action) {
    switch (action.type) {
        case types.ENTER_NAME_SUCCESS:
            return action.name;

        default:
            return state;
    }
};
