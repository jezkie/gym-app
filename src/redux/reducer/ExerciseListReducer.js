const initialState = {
    exercises: [],
    exercise: {}, loaded: false
}

export default function ExerciseListReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_EXERCISES':
            return {...state, exercises: action.payload, loaded: true};
        case 'GET_EXERCISE':
            return {...state, exercise: action.payload, loaded: true};
        default:
            return state;
    }
}