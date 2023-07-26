import React from "react";
import TaskList from "./TaskList";
import { Droppable } from "react-beautiful-dnd";
const TodoColumn = ({ column, tasks, flag }) => {


	return (
		<div className="column">
				<span style={{margin:14, fontSize:12}}>{column.title}</span>
				<div>
			<Droppable droppableId={column.id}>
				{(provided, snapshot) => (
					<div
						className={snapshot.isDragging ? `wrapper selected-col`:'wrapper'}
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
		</div>
	);
};

export default TodoColumn;
