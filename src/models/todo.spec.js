import { updateId, Todo } from './todo';

it('should reset id', () => {

	const expected = 0;
	const actual = updateId(true, 10);
	expect(expected).toEqual(actual);
});

it('should set id to value', () => {

	const expected = 10;
	const actual = updateId(false, 10);
	expect(expected).toEqual(actual);
});

it('should create a Todo', () => {

	const expected = {
		title: 'test',
		id: 0,
		completed: false,
	};
	const actual = Todo('test', true);
	expect(expected).toEqual(actual);
});
  