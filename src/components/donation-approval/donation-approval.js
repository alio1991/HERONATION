import { html, css, LitElement } from 'lit-element';

export class DonationsApproval extends LitElement {

  static get styles() {
    return css`
    :host {
      display: flex;
      width: fit-content;
      height:100%;
    }

    .donation-request{
      border-radius: 15px;
      background-color: white;
      border: solid 2px black;
      margin: 5px;
      padding: 10px;
      box-sizing: border-box;
    }

    textarea{
      width: 95%;
      height: 100px;
    }
    `;
  }

  static get properties() {
    return {
      donationsToApprove: Array
    };
  }

  constructor() {
    super();
  }


  render() {
    console.log(this.donationsToApprove);
    
    return html`
      <div id="donation-approval">
        <h1>Administración de peticiones</h1>
        ${
          this.donationsToApprove.map(donation => {
            return html`
              <div class="donation-request">
                <h1>${donation.nombre}</h1>
                <div>
                  ${donation.empresa} - (${donation.fecha})
                </div>
                <div>
                  <ul>
          ${donation.lista.map(elem => html`<li>${elem.quantity} ${elem.measure} de <u>${elem.item}</u></li>`)}
                  </ul>
                  <textarea>
                  </textarea>
                </div>
                <div>
                  <button type="button">Aceptar</button>
                  <button type="button">Rechazar</button>
                </div>
              </div>
            `;
          })
        }
      </div>
    `;
  }

}

customElements.define('donation-approval', DonationsApproval);
