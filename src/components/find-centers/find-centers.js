import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from './../../redux/store.js'
import { setLocation } from './../../redux/actions/actions.js'

export class FindCenters extends connect(store)(LitElement) {

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
          location:{
            type: Object
          }
        };
    }

    constructor() {
        super();
    }

    stateChanged(state){
        console.log('statechanged', state)
        this.location = state.location;
      }

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

    dispatchLocationChange(){
      store.dispatch(setLocation(this.location))
    }
    
    onDirectionChanges(ev) {
        this.location.stringLocation = ev.target.parentElement.firstElementChild.value;
        this.dispatchLocationChange();
                // window.location.href  = "/centers";
    }

    getLocation() {
        if (navigator.geolocation) { //check if geolocation is available
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position);
            });
            // window.location.href  = "/centers";
        }else{
            alert('Esta opción no está disponible en este momento.');
        }
    }

}

    customElements.define('find-centers', FindCenters);
