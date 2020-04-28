import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from './../../redux/store.js'
import { setLocation } from './../../redux/actions/actions.js'
import { setCoordinates } from './../../redux/actions/actions.js'
import { Router } from '@vaadin/router';

export class FindCenters extends connect(store)(LitElement) {

  static get styles() {
    return css`
    :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    p{
      color: rgba(var(--base-color), 1);
    }

    input{
      border: 0px transparent;
      border-radius: 3px;
      font-size: 1em;
    }
    button{
      border: 1px solid rgba(var(--purple-color), .5);
      color: rgb(var(--purple-color));
      background-color: rgba(var(--base-color), 1);
      border-radius: 5px;
      font-weight: 700;
      float: right;
      align-self: flex-end;
      font-size: 1em;
      margin-left: 5px;
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


  onDirectionChanges(ev) {
    store.dispatch(setLocation(ev.target.parentElement.firstElementChild.value))
    Router.go('/centers');
  }

  getLocation() {
    if (navigator.geolocation) { //check if geolocation is available
      navigator.geolocation.getCurrentPosition(function (position) {
        store.dispatch(setCoordinates({ latitude: position.coords.latitude, longitude: position.coords.longitude }))
        Router.go('/centers');
      });
    } else {
      alert('Esta opción no está disponible en este momento.');
    }
  }

}

customElements.define('find-centers', FindCenters);
