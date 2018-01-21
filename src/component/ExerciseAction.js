import fire from '../conf/fire';
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

function filterExerciseBySelectedId(list, id) {
    let exercise = {};
    if (list) {
        Object.keys(list).forEach(key => {
            if (key === id) {
                exercise = list[key];
                exercise.key = key;
            }
        })
    }
    return exercise;
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
            console.log('key value ->', key);
            exercisesRef.on('value', snap => {
                dispatch({
                    type: 'GET_EXERCISE',
                    payload: filterExerciseBySelectedId(snap.val(), key)
                });
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