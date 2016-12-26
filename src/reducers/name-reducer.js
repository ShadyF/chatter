import * as types from '../actions/action-types'

const initialState = 'Anonymous';

const nameReducer = function (state = initialState, action) {
    "use strict";
    switch (action.type) {
        case types.ENTER_NAME_SUCCESS:
            return action.name;

        default:
            return state;
    }
};