const initialState = {
    exercises: [],
    exercise: {}
}

export default function ExerciseListReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_EXERCISES':
            return {...state, exercises: action.payload};
        case 'GET_EXERCISE':
            return {...state, exercise: action.payload};
        default:
            return state;
    }
}