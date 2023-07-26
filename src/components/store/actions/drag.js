export const SAVE = "SAVE";
export const RESET = "RESET";

export const saveDragged = (state) => {
	return { type: SAVE, state: state };
};

export const resetDragged = () => {
	return { type: RESET };
};
