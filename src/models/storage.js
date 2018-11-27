export function initStorage(localStorage) {
	const name = 'todos-hyperHTML';
	return {
		get: () => JSON.parse(localStorage.getItem(name) || '[]'),
		set: value => localStorage.setItem(name, JSON.stringify(value))
	}
};
