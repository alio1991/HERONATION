import { html, css, LitElement } from 'lit-element';

export class TestPage extends LitElement {
  
  static get styles() {
    return css`
    :host {
    }
    `;
  }
  
  static get properties() {
    return {
      movie: { 
        type: Object
      },
      class: { 
        type: String
      }
    };
  }

  constructor(){
    super();
  }


  render() {
    return html`
        <div>
            <h1>Test</h1>
        </div>
    `;
  }
}

customElements.define('test-page', TestPage);
