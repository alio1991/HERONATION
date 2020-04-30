import { html, css, LitElement } from 'lit-element';
import '../center-card/center-card.js';


export class NearbyCenters extends LitElement {

  static get styles() {
    return css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      border-top: 1px solid black;
      box-sizing: border-box;
    }

    h3{
      font-weight: 700;
      color: rgb(var(--base-color));
      text-shadow: 0px 0px 4px #000;
      font-size: 1.9em;
    }

    #map{
      display: flex;
      padding: 10px;
      justify-content: center;
      align-items: center;
      width: 60%;
      height: 100%;
      box-sizing: border-box;
    }

    .centers-container{
      width: 40%;
      height: 100%;
      text-align: center;
      background-color: rgb(var(--base-color),0.3);
    }

    .centers-list::-webkit-scrollbar {display: none;}
    .centers-list{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 85%;
      overflow-y: scroll;
      box-sizing: border-box;
    }

    `;
  }

  static get properties() {
    return {
      userLocation: {
      },
      centersLocation: {
        type: Array
      }
    };
  }

  constructor() {
    super();
  }


  render() {
    return html`
        <div id="map">
        </div>
        <div class="centers-container">
          <h3>Centros Cercanos (${this.centersLocation.length})</h3>
          <div class="centers-list">
            ${this.centersLocation.map(center => html`
              <center-card .center=${center}></center-card>
            `)}
          </div>
        </div>
    `;
  }


  updated(changeProps) {
    if (changeProps.has('userLocation')) {
      if (this.userLocation && this.userLocation.latitude) {
        this.showMap();
      } else {
        // alert('Ubicación no detectada');
      }
    }
  }

  showMap() {
    if (this.userLocation.latitude) {

      let map = new google.maps.Map(
        this.shadowRoot.querySelector('div'), {
        zoom: 15,
        center: { lat: this.userLocation.latitude, lng: this.userLocation.longitude }
      }
      );
      // Picas en el mapa
      new google.maps.Marker({ position: { lat: this.userLocation.latitude, lng: this.userLocation.longitude }, map: map })


      //Centrar en un punto el mapa
      // map.setCenter({ latitude: this.userLocation.latitude, lng: this.userLocation.longitude });
    }
  }

}

customElements.define('nearby-centers', NearbyCenters);
