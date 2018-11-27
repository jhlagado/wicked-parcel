import { render, html } from 'lit-html';
import { observeProperties, debounceRender } from '../util/observe';

export class MyHeader extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: 'open'});
		this.requestRender = debounceRender(this);
		observeProperties(this, ['data']);  
	}

	propertyChangedCallback(name, value, oldValue) { 
		this.requestRender(); 
	}

	connectedCallback(name, value, oldValue) { 
		this.requestRender(); 
	}

	render() {
		render(
		    html`
				<style>
					
					:host {
						color: #4d4d4d;
					}

					:focus {
						outline: 0;
					}
					
					input::-webkit-input-placeholder {
						font-style: italic;
						font-weight: 300;
						color: #e6e6e6;
					}

					input::-moz-placeholder {
						font-style: italic;
						font-weight: 300;
						color: #e6e6e6;
					}

					input::input-placeholder {
						font-style: italic;
						font-weight: 300;
						color: #e6e6e6;
					}

					h1 {
						position: absolute;
						top: -155px;
						width: 100%;
						font-size: 100px;
						font-weight: 100;
						text-align: center;
						color: rgba(175, 47, 47, 0.15);
						-webkit-text-rendering: optimizeLegibility;
						-moz-text-rendering: optimizeLegibility;
						text-rendering: optimizeLegibility;
					}
					.new-todo {
						position: relative;
						margin: 0;
						width: 100%;
						font-size: 24px;
						font-family: inherit;
						font-weight: inherit;
						line-height: 1.4em;
						border: 0;
						color: inherit;
						padding: 6px;
						border: 1px solid #999;
						box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
						box-sizing: border-box;
						-webkit-font-smoothing: antialiased;
						-moz-osx-font-smoothing: grayscale;
					}

					.new-todo {
						padding: 16px 16px 16px 60px;
						border: none;
						background: rgba(0, 0, 0, 0.003);
						box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
					}
				</style>	
				<header class="header">
					<h1>todos</h1>
					<input 
						@keypress=${this.data.controller.create} 
						class="new-todo" 
						placeholder="What needs to be done?" 
						autofocus>
				</header>
			`,
			this.shadowRoot
		);
	}
}
try { 
	customElements.define('my-header', MyHeader); 
} catch (e) {}
