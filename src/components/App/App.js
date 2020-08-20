import React, { useEffect, useState } from "react";
import { TASKS } from "../data/dummy-data";
import TodoColumn from "../components/TodoColumn";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { saveDragged } from "../store/actions/drag";
import { useSelector } from "react-redux";
import dragReducer from "../store/reducers/drag";

function App() {
	const data = TASKS;
	console.log(data);
	const dispatch = useDispatch();
	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;
		console.log(source.index, destination.index, draggableId);

		if (!destination) {
			setFlag({ id: "", bool: "" });
			console.log("heres");
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			setFlag({ id: "", bool: "" });

			return;
		}

		if (destination.droppableId !== source.droppableId) {
			console.log("before :", data);

			const column_source = data.columns[source.droppableId];
			const column_dest = data.columns[destination.droppableId];
			const taskids_source = Array.from(column_source.taskIds);
			const taskids_dest = Array.from(column_dest.taskIds);

			taskids_source.splice(source.index, 1);
			taskids_dest.splice(destination.index, 0, draggableId);

			const newColSource = {
				...column_source,
				taskIds: taskids_source,
			};
			const newColDest = {
				...column_dest,
				taskIds: taskids_dest,
			};

			const newState = {
				...data,
				columns: {
					...data.columns,
					[newColSource.id]: newColSource,
					[newColDest.id]: newColDest,
				},
			};

			console.log("After :", newState);
			// setData(newState);
			dispatch(saveDragged(newState));
			setFlag({ id: "", bool: "" });
			return;
		}

		//! getting column and its taskids
		//! droppable id is columnId basically
		const column = data.columns[source.droppableId];
		//! getting tasklist from that column
		const newTask = Array.from(column.taskIds);

		//! removing item from that index to change
		newTask.splice(source.index, 1);

		//! putting draggableId refrence to tasklist at destination index
		//! destination index == when you end you drag
		newTask.splice(destination.index, 0, draggableId);

		//! updating tasklist to column

		const newCol = {
			...column,
			taskIds: newTask,
		};

		//! updating column to statedata
		const newState = {
			...data,
			columns: {
				...data.columns,
				[newCol.id]: newCol,
			},
		};

		//! updating done
		// setData(newState);
		dispatch(saveDragged(newState));
		setFlag({ id: "", bool: "" });
	};

	const [flag, setFlag] = useState({ id: "", bool: false });
	const onDragStart = (result) => {
		// console.log(result);
		setFlag({ id: result.source.droppableId, bool: true });
	};

	let caps = [
		{ id: 65, character: "A" },
		{ id: 66, character: "B" },
		{ id: 67, character: "C" },
		{ id: 68, character: "D" },
		{ id: 69, character: "E" },
		{ id: 70, character: "F" },
		{ id: 71, character: "G" },
		{ id: 72, character: "H" },
		{ id: 73, character: "I" },
		{ id: 74, character: "J" },
		{ id: 75, character: "K" },
		{ id: 76, character: "L" },
		{ id: 77, character: "M" },
		{ id: 78, character: "N" },
		{ id: 79, character: "O" },
		{ id: 80, character: "P" },
		{ id: 81, character: "Q" },
		{ id: 82, character: "R" },
		{ id: 83, character: "S" },
		{ id: 84, character: "T" },
		{ id: 85, character: "U" },
		{ id: 86, character: "V" },
		{ id: 87, character: "W" },
		{ id: 88, character: "X" },
		{ id: 89, character: "Y" },
		{ id: 90, character: "Z" },
	];
	let smalls = [
		{ id: 65, character: "a" },
		{ id: 66, character: "b" },
		{ id: 67, character: "c" },
		{ id: 68, character: "d" },
		{ id: 69, character: "e" },
		{ id: 70, character: "f" },
		{ id: 71, character: "g" },
		{ id: 72, character: "h" },
		{ id: 73, character: "i" },
		{ id: 74, character: "j" },
		{ id: 75, character: "k" },
		{ id: 76, character: "l" },
		{ id: 77, character: "m" },
		{ id: 78, character: "n" },
		{ id: 79, character: "o" },
		{ id: 80, character: "p" },
		{ id: 81, character: "q" },
		{ id: 82, character: "r" },
		{ id: 83, character: "s" },
		{ id: 84, character: "t" },
		{ id: 85, character: "u" },
		{ id: 86, character: "v" },
		{ id: 87, character: "w" },
		{ id: 88, character: "x" },
		{ id: 89, character: "y" },
		{ id: 90, character: "z" },
	];
	let temp = "here :";
	let last_key = "";
	const moveFunc = ({ keyCode, ctrlKey, shiftKey }) => {
		if (shiftKey) {
			const indexForSmall = smalls.findIndex((el, index) => {
				if (el.id == keyCode && keyCode <= 90 && keyCode >= 65) {
					return index;
				}
			});

			if (smalls[indexForSmall]) {
				temp = temp + smalls[indexForSmall].character;
			}
			if (indexForSmall == -1 && keyCode == 65) {
				temp = temp + "a";
			}
			console.log(temp);
			last_key = "";
			return;
		} else {
			const index = caps.findIndex((el) => {
				if (el.id == keyCode && keyCode != 16) return el;
			});
			if (caps[index]) {
				temp = temp + caps[index].character;
			}
			console.log(temp);
			last_key = keyCode;
			return;
		}
	};

	return (
		<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
			<div role="button" className="app" onKeyDown={(e) => moveFunc(e)}>
				{data.order.map((columnids, index) => {
					const column = data.columns[columnids];
					const task = column.taskIds.map((taskIds) => data.tasks[taskIds]);

					return (
						<TodoColumn key={index} column={column} flag={flag} tasks={task} />
					);
				})}
			</div>
		</DragDropContext>
	);
}

export default App;
