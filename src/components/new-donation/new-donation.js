import { html, css, LitElement } from 'lit-element';

export class NewDonation extends LitElement {

  static get styles() {
    return css`
    :host {
      display: flex;
      width: fit-content;
      height:100%;
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
        <div id="new-donation">
          <h1>New Donation</h1>
        </div>
    `;
  }

}

customElements.define('new-donation', NewDonation);
