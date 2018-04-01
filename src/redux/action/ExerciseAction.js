import fire from '../../conf/fire';
const exercisesRef = fire.database().ref().child('exercises');

function mapExerciseToKey(list) {
    let exercises = [];
    if (list) {
        Object.keys(list).forEach(key => {
            exercises.push(Object.assign({ key: key }, list[key]));
        })
    }
    return exercises;
}

export function fetchExercises(key) {
    return (
        dispatch => {
            if (key) {
                exercisesRef.orderByChild('type').equalTo(key).on('value', (snap) => {
                    dispatch({
                        type: 'GET_EXERCISES',
                        payload: mapExerciseToKey(snap.val())
                    });
                });
            } else {
                exercisesRef.on('value', snap => {
                    dispatch({
                        type: 'GET_EXERCISES',
                        payload: mapExerciseToKey(snap.val())
                    });
                });
            }
        }
    )
}

export function createExercise(exercise) {
    return dispatch => exercisesRef.push(exercise);
}

export function deleteExercise(key) {
    return (
        dispatch => {
            exercisesRef.child(key).remove();
        }
    )
}

export function fetchExercise(key) {
    return (
        dispatch => {
            exercisesRef.orderByKey().equalTo(key).on('child_added', (snap) => {
                const exercise = Object.assign({}, snap.val(), {key: key});
                dispatch({
                    type: 'GET_EXERCISE',
                    payload: exercise
                })
            });
        }
    )
}

export function updateExercise(exercise) {
    return (
        dispatch => {
            exercisesRef.child(exercise.key).update(exercise);
        }
    )
}

export function fetchRecentExercise() {
    return (
        dispatch => {
            dispatch({
                type: 'GET_RECENT_EXERCISE',
                payload: { weight: 100, unit: 'lbs', reps: 8 } 
            })
        }
    )
}