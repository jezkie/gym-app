const initialState = {
    exercises: []
}

export default function ExerciseListReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_EXERCISES':
            return {...state, exercises: action.payload};
        default:
            return state;
    }
}