import {
	selectIfMatch,
	showIfSomeTodos,
	pluralize,
	showIfSomeComplete,
} from './footer';

it('set class to "select" if match', () => {

	const expected = 'selected';
	const actual = selectIfMatch('x', 'x');
	expect(expected).toEqual(actual);
});

it('set class to "" if not match', () => {

	const expected = '';
	const actual = selectIfMatch('x', 'y');
	expect(expected).toEqual(actual);
});

it('show if todos length > 0', () => {

	const expected = '';
	const actual = showIfSomeTodos(1);
	expect(expected).toEqual(actual);
});

it('hide if todos length == 0', () => {

	const expected = 'display: none';
	const actual = showIfSomeTodos(0);
	expect(expected).toEqual(actual);
});

it('pluralize if length >= 2', () => {

	const expected = 's';
	const actual = pluralize(5);
	expect(expected).toEqual(actual);
});

it('don\'t pluralize if length < 2', () => {

	const expected = '';
	const actual = pluralize(1);
	expect(expected).toEqual(actual);
});

it('show if todos length > 0', () => {

	const expected = '';
	const actual = showIfSomeComplete(1, 5);
	expect(expected).toEqual(actual);
});

it('hide if todos length == 0', () => {

	const expected = 'display: none';
	const actual = showIfSomeComplete(5, 5);
	expect(expected).toEqual(actual);
});
