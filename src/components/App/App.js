import React, { useEffect, useState } from "react";
import { TASKS } from "../data/dummy-data";
import TodoColumn from "../components/TodoColumn";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { resetDragged, saveDragged } from "../store/actions/drag";
import { useSelector } from "react-redux";
import dragReducer from "../store/reducers/drag";

function App() {
	let data = useSelector((state) => state.dragReducer )
	const [refresh, setRefresh] = useState(0)

	if (!data) {
		data = TASKS
		setRefresh(refresh+1)
	}
	const dispatch = useDispatch();
	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;
		console.log("Source: ",source,draggableId)
		
		if(destination){
			console.log("Destination :", destination);
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return 
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index !== source.index
		) {
			let temp = data.columns[source.droppableId].taskIds
			temp.splice(source.index, 1)
			temp.splice(destination.index, 0, draggableId)
			data.columns[source.droppableId].taskIds = temp;
			dispatch(saveDragged(data));
			setRefresh(refresh+1)
		}

		if (destination.droppableId !== source.droppableId) {
		
			let sourceList = data.columns[source.droppableId].taskIds
			let destinationList =  data.columns[destination.droppableId].taskIds

			sourceList.splice(source.index, 1)
			destinationList.splice(destination.index,0, draggableId)

			data.columns[source.droppableId].taskIds = sourceList
			data.columns[destination.droppableId].taskIds = destinationList

			dispatch(saveDragged(data));
			setRefresh(refresh+1)
			return;
		}

	};

	const [flag, setFlag] = useState({ id: "", bool: false });
	const onDragStart = (result) => {
		setFlag({ id: result.source.droppableId, bool: true });
	};


	return  data && data.order.length > 0 && (
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
			<button 
			style={{display:'block',margin:'auto'}} 
			onClick={() => {
				dispatch(resetDragged());
				window.location.reload()
			}}>
					Clear
			</button>
		</DragDropContext>
	);
}

export default App;
