import { render, html } from 'lit-html';
import { observeProperties, debounceRender } from '../util/observe';

export class MyContainer extends HTMLElement {

	constructor() {
		super();
		this.attachShadow({mode: 'open'});
		this.requestRender = debounceRender(this);
		this.data = {};
		observeProperties(this, ['data']);  
	}

	propertyChangedCallback(name, value, oldValue) { 
		this.requestRender(); 
	}

	render() {
		render(
		    html`
				<my-header .data=${this.data}></my-header>
				<todo-list .data=${this.data}></todo-list>
				<my-footer .data=${this.data}></my-footer>
			`,
			this.shadowRoot
		);
	}
}
try { 
	customElements.define('my-container', MyContainer); 
} catch (e) {}
