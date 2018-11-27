import wickedElements from 'wicked-elements';
import hyperHTML from 'hyperhtml';

wickedElements.define('[is="wicked-element"]', {

    init: function (event) {
        this.el = event.currentTarget;
        this.el.attachShadow({mode:'open'});
        this._rando = Math.random();
        this.render();
    },

    onconnected(event) {
        console.log('on connected');
    },

    ondisconnected(event) {
        console.log('on disconnected');
    },

    onattributechanged(event) {
        console.log('on attr changed');
    },

    onclick(event) {
        console.log('ON CLICK!!');
    },

    render() {
        this.html`!<slot></slot>!<p>I am rando ${this._rando}</p>`;
    },

    get html() {
        return hyperHTML.bind(this.el.shadowRoot);
    }
});
