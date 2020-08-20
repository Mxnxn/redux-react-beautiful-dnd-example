import React from "react";
import TaskList from "./TaskList";
import { Droppable } from "react-beautiful-dnd";
const TodoColumn = ({ column, tasks, flag }) => {
	return (
		<div className="column">
			<div>
				<h3>{column.title}</h3>
			</div>
			<Droppable droppableId={column.id}>
				{(provided, snapshot) => (
					<div
						className={
							flag.bool && flag.id !== column.id
								? "wrapper selected-col"
								: "wrapper"
						}
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{tasks.map((task, index) => (
							<TaskList task={task} index={index} key={task.id} />
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default TodoColumn;
