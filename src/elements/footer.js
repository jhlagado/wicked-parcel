import { render, html } from 'lit-html';
import { observeProperties, debounceRender } from '../util/observe';

export const selectIfMatch = (hash, curr) => hash === curr ? 'selected' : '';
export const showIfSomeTodos = length => length > 0 ? '' : 'display: none';
export const pluralize = length => length >= 2 ? 's' : '';
export const showIfSomeComplete = (numTodosIncomplete, numTodos) => numTodosIncomplete < numTodos ? '' : 'display: none'

export class MyFooter extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: 'open'});
		this.requestRender = debounceRender(this);
		observeProperties(this, ['data']);  
	}

	propertyChangedCallback(name, value, oldValue) { 
		this.requestRender(); 
	}

	connectedCallback(){
		this.requestRender();
	}

	render() {
		const controller = this.data.controller;
		const numTodos = controller.todosSize();
		const numTodosIncomplete = controller.todosLeft();
		const hash = controller.hash();
		
		render(
		    html`
				<footer class="footer" style="${showIfSomeTodos(numTodos)}">
					<span class="todo-count">
						<strong> ${numTodosIncomplete} </strong> item${pluralize(numTodosIncomplete)} left
					</span>
					<ul class="filters">
						<li>
							<a class="${selectIfMatch(hash, 'all')}" href="#/">All</a>
						</li>
						<li>
							<a class="${selectIfMatch(hash, 'active')}" href="#/active">Active</a>
						</li>
						<li>
							<a class="${selectIfMatch(hash, 'completed')}" href="#/completed">Completed</a>
						</li>
					</ul>
					<button class="clear-completed" onclick="${controller.clear}" style="${showIfSomeComplete(numTodosIncomplete, numTodos)}">Clear completed</button>
				</footer>
			`,
			this.shadowRoot
		);
	}
}
try { 
	customElements.define('my-footer', MyFooter); 
} catch (e) {};
