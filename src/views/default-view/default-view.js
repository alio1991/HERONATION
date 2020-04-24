import { html, css, LitElement } from 'lit-element';

export class DefaultView extends LitElement {

  static get styles() {
    return css`
    :host {
      width: 120%;
      height: 100%;
      display: flex;
      margin-left: -10%;
    }
    
    .selector{
      width: 60%;
      height: 100%;
      display:flex;
      align-items: center;
      justify-content: center;
      color: rgb(var(--base-color));
      transform: skewX(-18deg);
      cursor: pointer;
    }
    .selector-citizen{
      transition: background-color ease-in-out 0.8s;
      background-color: rgba(var(--purple-color), 0.3);
    }
    .selector-corporation{
      transition: background-color ease-in-out 0.8s;
      background-color: rgba(var(--green-color), 0.3);
    }
    .selector-citizen:hover{
      background-color: rgba(var(--purple-color), 0.6);
    }
    .selector-corporation:hover{
      background-color: rgba(var(--green-color), 0.6);
    }
    `;
  }

  static get properties() {
    return {
      profileSelected: {
        type: String
      }
    };
  }

  constructor() {
    super();
  }


  render() {
    return html`
        <div class="selector selector-citizen">
          <h1>Citizen</h1>  
        </div>
        <div class="selector selector-corporation">
          <h1>Corporation</h1>  
        </div>
    `;
  }
}

customElements.define('default-view', DefaultView);
