import fire from '../conf/fire';
const exercisesRef = fire.database().ref().child('exercises');
export function fetchExercises(key) {
    return (
        dispatch => {
            if (key) {
                exercisesRef.orderByChild('type').equalTo(key).on('value', (snap) => {
                    console.log(snap.val());
                    dispatch({
                        type: 'GET_EXERCISES',
                        payload: snap.val()
                    });
                }); 
            } else {
                exercisesRef.on('value', snap => {
                    dispatch({
                        type: 'GET_EXERCISES',
                        payload: snap.val()
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
            exercisesRef.orderByChild('id').equalTo(key).on('child_added', (snap) => {
                snap.ref.remove();
            })
        }
    )
 }