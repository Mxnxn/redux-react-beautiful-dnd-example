module.exports.TASKS = Object.freeze({
	tasks: {
		task1: {
			id: "task1",
			content: "HEY",
		},
		task2: {
			id: "task2",
			content: "OK",
		},
		task3: {
			id: "task3",
			content: "why",
		},
		task4: {
			id: "task4",
			content: "lmao",
		},
		task5: {
			id: "task5",
			content: "task5",
		},
		task6: {
			id: "task6",
			content: "task6",
		},
		task7: {
			id: "task7",
			content: "task7",
		},
		task8: {
			id: "task8",
			content: "task8",
		},
		task9: {
			id: "task9",
			content: "task9",
		},
		task10: {
			id: "task10",
			content: "task10",
		},
	},
	columns: {
		column1: {
			id: "column1",
			title: "To Develop",
			taskIds: ["task1", "task3", "task5", "task8", "task9", "task10"],
		},
		column2: {
			id: "column2",
			title: "Bug Fixes",
			taskIds: ["task2", "task4", ],
		},
		column3: {
			id: "column3",
			title: "Push to Test",
			taskIds: ["task6", "task7"],
		},
	},
	order: ["column1", "column2","column3"],
});
