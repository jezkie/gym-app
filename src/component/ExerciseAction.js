import fire from '../conf/fire';
const exercisesRef = fire.database().ref().child('exercises');

function mapExerciseToKey(list) {
    let exercises = [];
    Object.keys(list).forEach(key => {
            exercises.push(Object.assign({ key: key }, list[key]));
        }
    )
    return exercises;
}

export function fetchExercises(key) {
    return (
        dispatch => {
            let exercises = [];
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

export function updateExercise(exercise) {
    return (
        dispatch => {
            // exercisesRef.orderByChild('id').equalTo(exercise.id).on('child_added', (snap) => {
            //     snap.ref.update(exercise);
            // })
            exercisesRef.child(exercise.key).update(exercise);
        }
    )
}