import { SAVE } from "../actions/drag";
import { TASKS } from "../../data/dummy-data";

const initial_state = {
	state: TASKS,
};

const dragReducer = (state = null, action) => {
	switch (action.type) {
		case SAVE:
			return action.state;
		default:
			return state;
	}
};

export default dragReducer;
