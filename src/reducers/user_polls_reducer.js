import {
    FETCH_USER_POLLS
} from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_USER_POLLS:
        return action.payload;
    }
    return state;
}

        
            