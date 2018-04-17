import {
    SUBMIT_POLL,
    FETCH_POLL,
    POLL_ACCESSED,
    SELECTION_SUBMITTED,
    FETCH_ALL_POLLS
} from '../actions/types';

export default function(state = {pollTitle: '', pollOptions: [], pollResults: [], pollId: '', showPollForm: true, allPolls: [], loadingPolls: true}, action) {
    switch(action.type) {
        case SUBMIT_POLL:
            return {...state, pollTitle: action.payload['data'].pollTitle, pollOptions: action.payload['data'].pollOptions}
        case FETCH_POLL:
            return {...state, pollTitle: action.payload['data'].pollTitle, pollOptions: action.payload['data'].pollOptions, pollResults: action.payload['data'].pollResults}
        case SELECTION_SUBMITTED: 
            return {...state, showPollForm: action.payload.showPollForm, pollResults: action.payload.pollData.results}
        case FETCH_ALL_POLLS:
            return {...state, allPolls: action.payload, loadingPolls: false}
    }
    return state;
}