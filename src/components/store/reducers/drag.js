import { RESET, SAVE } from "../actions/drag";
import { TASKS } from "../../data/dummy-data";

const initial_state = {
	state: TASKS,
};

const dragReducer = (state = initial_state, action) => {
	switch (action.type) {
		case SAVE:
			return action.state;
		case RESET:
			return TASKS;
		default:
			return state ;
	}
};

export default dragReducer;
