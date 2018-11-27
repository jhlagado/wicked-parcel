import { render, html } from 'lit-html';
import { observeProperties, debounceRender } from '../util/observe';
import { ENTER_KEY, ESC_KEY } from '../controllers/todo';

export class TodoItem extends HTMLElement {

	static get observedAttributes() { return ['title','index','completed']; }

	constructor() {
		super();
		this.attachShadow({mode: 'open'});
		this.requestRender = debounceRender(this);
		observeProperties(this, ['data']);  
	}
	
	propertyChangedCallback(name, value, oldValue) { 
		this.requestRender(); 
	}

	dblclick2Edit(event) {
		const input = event.target;
		const li = input.closest('li');
		li.classList.add('editing');
		li.querySelector('.edit').focus();
	}
	
	blur2Save(event) {
		const index = this.getAttribute('index');
		const input = event.target;
		input.closest('li').classList.remove('editing');
		this.data.controller.edit(index, event);
	}

	edit(event) {
		const index = this.getAttribute('index');
		const input = event.target;
		if (event.keyCode === ENTER_KEY) {			
			input.closest('li').classList.remove('editing');
		}
		this.data.controller.edit(index, event);
	}

	escape2Reset(event) {
		const input = event.target;
		if (event.keyCode === ESC_KEY) {
			input.value = this.data.todo.title;
			input.blur();
		}
	}

	complete(event) {
		const index = this.getAttribute('index');
		this.data.controller.complete(index);
	}

	destroy(event) {
		const index = this.getAttribute('index');
		this.data.controller.destroy(index);
	}

	render(){
		const title = this.getAttribute('title');
		const completed = this.getAttribute('completed');

		render(
		    html`
				<li
					data-index="${this.getAttribute('index')}"
					class="${completed ? 'completed' : ''}"
				>
					<div class="view">
						<input
							class="toggle"
							type="checkbox"
							checked="${completed}"
							@click=${this.complete.bind(this)}>
						<label @dblclick=${this.dblclick2Edit.bind(this)}>${title}</label>
						<button class="destroy" @click=${this.destroy.bind(this)}></button>
					</div>
					<input
						class="edit"
						value="${title}"
						@blur=${this.blur2Save.bind(this)}
						@keypress=${this.edit.bind(this)}
						@keydown=${this.escape2Reset.bind(this)}>
				</li>
			`,
			this.shadowRoot
		);
	}
}

try { 
	customElements.define('todo-item', TodoItem); 
} catch (e) {}
