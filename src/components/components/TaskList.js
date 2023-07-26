import React from "react";
import { Draggable } from "react-beautiful-dnd";

const TaskList = ({ task, index }) => {
	return (
		<Draggable draggableId={task.id} index={index}>
			{(provided, snapshot) => {
				return (
					<div
						className={`task ${snapshot.isDragging ? "selected" : ""}`}
						{...provided.dragHandleProps}
						{...provided.draggableProps}
						ref={provided.innerRef}

					>
						{task.content}
					</div>
				);
			}}
		</Draggable>
	);
};

export default TaskList;
