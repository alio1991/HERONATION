import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from './../../redux/store.js';
import { setLogin } from './../../redux/actions/actions.js';
import { Router } from '@vaadin/router';

export class DefaultView extends connect(store) (LitElement) {

  static get styles() {
    return css`
    :host {
      width: 140%;
      height: 100%;
      display: flex;
      margin-left: -20%;
    }
    
    .selector{
      width: 70%;
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
      background-color: rgba(var(--purple-color), 0.25);
    }
    .selector-corporation{
      transition: background-color ease-in-out 0.8s;
      background-color: rgba(var(--green-color), 0.25);
    }
    .selector-citizen:hover{
      background-color: rgba(var(--purple-color), 0.5);
    }
    .selector-corporation:hover{
      background-color: rgba(var(--green-color), 0.5);
    }

    .selector-expanded{
      animation-duration: 1s;
      animation-name: extendDiv;
      animation-fill-mode: forwards;
    }

    .selector-colapsed{
      animation-duration: 1s;
      animation-name: decreaseDiv;
      animation-fill-mode: forwards;
    }

    @keyframes extendDiv{
      from {width: 70%;}
      to {width: 140%;}
    }

    @keyframes decreaseDiv{
      from {width: 70%;}
      to {width: 0%;}
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
    // if(this.shadowRoot.querySelector('.selector')){
    //   this.shadowRoot.querySelector('.selector').addEventListener('mouseover',(e)=>{
    //     debugger;
    //   });
    // }
  }


  render() {
    return html`
        <div class="selector selector-citizen"  @click="${()=>{this.selectUserType('CITIZEN', 'selector-citizen', 'selector-corporation')}}">
          <h1>Citizen</h1>  
        </div>
        <div class="selector selector-corporation" @click="${()=>{this.selectUserType('CORPORATION', 'selector-corporation', 'selector-citizen')}}">
          <h1>Corporation</h1>  
        </div>
    `;
  }

  selectUserType(userType, expanded, colapsed){
    store.dispatch(setLogin(userType));
    this.shadowRoot.querySelector(`.${expanded}`).classList.add('selector-expanded');
    this.shadowRoot.querySelector(`.${colapsed}`).classList.add('selector-colapsed');
    setTimeout(()=>Router.go('/access'), 1500);
    
  }
}

customElements.define('default-view', DefaultView);
