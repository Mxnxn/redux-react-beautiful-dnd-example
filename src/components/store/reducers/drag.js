<<<<<<< HEAD
import { SAVE } from "../actions/drag";
=======
import { RESET, SAVE } from "../actions/drag";
>>>>>>> 3c06ae7 (- updation)
import { TASKS } from "../../data/dummy-data";

const initial_state = {
	state: TASKS,
};

<<<<<<< HEAD
const dragReducer = (state = null, action) => {
	switch (action.type) {
		case SAVE:
			return action.state;
		default:
			return state;
=======
const dragReducer = (state = initial_state, action) => {
	switch (action.type) {
		case SAVE:
			return action.state;
		case RESET:
			return TASKS;
		default:
			return state ;
>>>>>>> 3c06ae7 (- updation)
	}
};

export default dragReducer;
