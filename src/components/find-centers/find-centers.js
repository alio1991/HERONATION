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

    .options{
        display: flex;
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
        <div class="options">
            <input class="direction" type="text"/>
            <button type="button" @click=${this.onDirectionChanges}>🔍</button>
            <button type="button" class="map-icon" @click=${this.getLocation}>📌</button>
        </div>
    `;
    }

    onDirectionChanges(ev) {
        const inputValue = ev.target.parentElement.firstElementChild.value;
        window.location.href  = "/centers";
    }

    getLocation() {
        if (navigator.geolocation) { //check if geolocation is available
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position);
            });
            window.location.href  = "/centers";
        }else{
            alert('Esta opción no está disponible en este momento.');
        }
    }

}

    customElements.define('find-centers', FindCenters);
