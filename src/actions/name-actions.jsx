import * as types from './action-types'

export function enterNameSuccess(name) {
    "use strict";
    return {
        type: types.ENTER_NAME_SUCCESS,
        name
    }
}