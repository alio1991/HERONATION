import { html, css, LitElement } from 'lit-element';
import '../../styles.css';
import { connect } from 'pwa-helpers';
import { store } from './../../redux/store.js'

export class CentersLocation extends connect(store)(LitElement) {

  static get styles() {
    return css`
    :host {
      position: absolute;
      width: 100%;
      height: 100%;
      padding-top: var(--header-height);
    }
    .centers-container{
      display: flex;
      width: 100%;
      height:70%;
      margin-left: 10%;
    }
    #map{
      width: 50%;
      height: 100%;

    }
    .centers-list{
      width: 50%;
      height: 100%;
    }
    `;
  }

  static get properties() {
    return {
      userLocation: {
        type: Object
      }
    };
  }

  constructor() {
    super();
  }

  stateChanged(state) {
    this.userLocation = state.location ? state.location : state.coordinates;
    if (state.location) { //Tiro de dirección

    } else { //tiro de coordenadas

    }

  }

  render() {
    return html`
        <h1>${ this.userLocation || 'CENTERS'}</h1>
        <div class="centers-container">
        <div id="map">

          <a href="/">Return</a>
        </div>
        <div class="centers-list">
          <h3>LISTA</h3>
        </div>
        </div>
    `;
  }

  updated(changeProps) {
    if (changeProps.has('userLocation')) {
      this.showMap();
    }
  }

  showMap() {
    if (this.userLocation.latitude) {
      let map = new google.maps.Map(
        this.shadowRoot.querySelector('#map'), {
        zoom: 15,
        center: { lat: this.userLocation.latitude, lng: this.userLocation.longitude }
      }
      );
      let marker = new google.maps.Marker({ position: { lat: this.userLocation.latitude, lng: this.userLocation.longitude }, map: map })
    }
  }

}

customElements.define('centers-location', CentersLocation);
