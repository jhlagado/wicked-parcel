let counter = 0;

export const updateId = (init, counter) => init ? 0 : counter++;

export const Todo = (title, init) => ({
	title,
	id: updateId(init, counter),
	completed: false
});
