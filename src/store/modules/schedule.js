/*
 * Constants
 */
export const ADD_TO_MY_SCHEDULE = 'ADD_TO_MY_SCHEDULE';
export const REMOVE_FROM_MY_SCHEDULE = 'REMOVE_FROM_MY_SCHEDULE';

/*
 * Initial state
 */
const initialState = {};

/*
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_MY_SCHEDULE: {
      return { ...state, [action.event.id]: true };
    }
    case REMOVE_FROM_MY_SCHEDULE: {
      return { ...state, [action.event.id]: false };
    }
    default: {
      return state;
    }
  }
}

/*
 * Actions
 */
export function toggleEvent(event) {
  return (dispatch, getState) => {
    const { schedule } = getState();

    if (schedule[event.id]) {
      return dispatch({
        type: REMOVE_FROM_MY_SCHEDULE,
        event,
      });
    }

    return dispatch({
      type: ADD_TO_MY_SCHEDULE,
      event,
    });
  };
}
