import { html, css, LitElement } from 'lit-element';
import { initRouter } from '../../router';

export class FindCenters extends LitElement {

    static get styles() {
        return css`
    :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    input{
        border-radius: 15px;
        width: 90%;
    }
    `;
    }

    static get properties() {
        return {
        };
    }

    constructor() {
        super();
        this._page = '';
    }

    // <nav>
    //     <a href="/test-page">Test</a>
    //     <a href="/testing-page">Testing</a>
    // </nav>


    render() {
        return html`
        <p>Indique una dirección para encontrar los centros cercanos</p>
        <input type="text" @keyup=${this.onDirectionChanges}/>
    `;
    }

    onDirectionChanges({target}) {
        console.log(target.value);
        
    }

    updated(changgeProps) {
        if (changgeProps.has('_page')) {
            initRouter(this.shadowRoot.querySelector('main'));
        }
    }
}

customElements.define('find-centers', FindCenters);
