import { render, html } from 'lit-html';
import { observeProperties, debounceRender } from '../util/observe';

export class TodoList extends HTMLElement {

	constructor() {
		super();
		this.attachShadow({mode: 'open'});
		this.requestRender = debounceRender(this);
		observeProperties(this, ['data']);  
	}

	connectedCallback(){
		this.data.controller.subscribe(() => this.requestRender());
	}

	propertyChangedCallback(name, value, oldValue) { 
		this.requestRender(); 
	}

	render() {

		const controller = this.data.controller;
		const todos = controller.getFilteredItems();
		render(
		    html`
			<section class="main" style="${todos.length ? '' : 'display:none'}">
				<input
					class="toggle-all"
					id="toggle-all"
					type="checkbox"
					@click=${controller.toggleAll}
					checked="${todos.every(todo => todo.completed)}">
				<label for="toggle-all">Mark all as complete</label>
				<ul class="todo-list">${todos.map(
					(todo, index) => html`
						<todo-item 
							title=${todo.title}
							completed=${todo.completed}
							index=${index} 
							.data=${this.data} />`
				)}</ul>
			</section>
			`,
			this.shadowRoot
		);
	}
}
try { 
	customElements.define('todo-list', TodoList); 
} catch (e) {}
