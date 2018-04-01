const initialState = {
    exercises: [],
    exercise: {},
    recentExercise: {},
    loaded: false,
    success: null,
    error: null
}

export default function ExerciseListReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_EXERCISES':
            return { ...state, exercises: action.payload, loaded: true };
        case 'GET_EXERCISE':
            return { ...state, exercise: action.payload, loaded: true };
        case 'GET_RECENT_EXERCISE':
            return { ...state, recentExercise: action.payload, loaded: true };
        case 'ADD_EXERCISE_FULLFILLED':
            return {
                ...state, success: 'Exercise added...'
            }
        case 'EDIT_EXERCISE_FULLFILLED':
            return {
                ...state, success: 'Exercise updated...', exercise: action.payload
            }
        default:
            return state;
    }
}