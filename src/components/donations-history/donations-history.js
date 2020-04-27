import { html, css, LitElement } from 'lit-element';

export class DonationsHistory extends LitElement {

  static get styles() {
    return css`
    :host {
      display: flex;
      width: fit-content;
      height:100%;
    }

    .donation{
      border-radius: 15px;
      background-color: white;
      border: solid 2px black;
      margin: 5px;
      padding: 10px;
      box-sizing: border-box;
    }
    `;
  }

  static get properties() {
    return {
      donationsHistory: Array
    };
  }

  constructor() {
    super();
  }


  render() {
    return html`
      <div id="history-donation">
        <h1>Historial de donaciones</h1>
        ${
          this.donationsHistory.map(donation => {
            return html`
              <div class="donation">
                <h1>${donation.nombre}</h1>
                <div>
                  ${donation.empresa} - (${donation.fecha})
                </div>
              </div>
            `;
          })
        }
      </div>
    `;
  }

}

customElements.define('donations-history', DonationsHistory);
