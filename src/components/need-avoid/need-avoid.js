import { html, css, LitElement } from 'lit-element';
import { baseUrl } from '../../../base.route.js'

export class NeedAvoid extends LitElement {

  static get styles() {
    return css`
    :host {
      display: flex;
      width: 100%;
      height:100%;
    }

    h3{
      margin:0;
      padding: 0;
    }
    .donation-approval{
      width: 100%;
    }

    
    .filter{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      min-height: 50px;
      height: fit-content;
    }

    .avoid-filter{
      background-color: rgba(var(--red-color),0.8);
    }

    .need-filter{
      background-color: rgba(var(--green-color),0.8);
    }
    `;
  }

  static get properties() {
    return {
      categoryList: Array,
      needList: Array,
      avoidList: Array,
      needListToShow: Array,
      avoidListToShow: Array
    };
  }

  constructor() {
    super();
    this.categoryList = [];
    this.needList = [];
    this.avoidList = [];
    this.needListToShow = [];
    this.avoidListToShow = [];
  }

  firstUpdated() {
    const token = sessionStorage.getItem('heronationToken');
    fetch(baseUrl + '/api/categoria-productos')
      .then(response => response.json())
      .then(categories => {
        this.categoryList = [...categories];
        this.needListToShow = [...categories];
        this.avoidListToShow = [...categories];
      });

    const email = sessionStorage.getItem('email');
    fetch(baseUrl + '/api/preferencias/empresa/email/'+email, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
    })
      .then(response => response.json())
      .then(categories => {
        categories.map(category => {
          if (category.exclusion) {            
            this.avoidList.push(category.categoriaProducto.id);
          } else if (category.necesidad) {
            this.needList.push(category.categoriaProducto.id);
          }
        })
        this.manageDefaultChecks();
      });

  }

  render() {
    return html`
      <div class="donation-approval">
        <div class="filters">
          <div class="filter avoid-filter">
            <h3>Categorías Excluidas:</h3>${this.getAvoidFilter(this.avoidListToShow)}
          </div>
          <div class="filter need-filter">
            <h3>Categorías Preferentes:</h3>${this.getNeedFilter(this.needListToShow)}
          </div>
        </div>
      </div>
    `;
  }

  getAvoidFilter(list) {
    return list.map(elem => {
      return html`
        <div class="filter-option">
          <input type="checkbox" id=${elem.id} @change=${this.avoidModified}/>
          <label>${elem.nombre}</label>
        </div>
      `})
  }

  getNeedFilter(list) {
    return list.map(elem => {
      return html`
        <div class="filter-option">
          <input type="checkbox" id=${elem.id} @change=${this.needModified}/>
          <label>${elem.nombre}</label>
        </div>
      `}
    );
  }

  needModified({ target }) {
    const { id } = target;
    if (target.checked) {
      this.needList.push(this.categoryList.find(elem => elem.id.toString() === id.toString()));
      this.avoidListToShow = [...this.avoidListToShow.filter(elem => elem.id.toString() !== id.toString())]
    } else {
      this.needList = [...this.categoryList.filter(category => category.id.toString() !== id.toString())];
      this.avoidListToShow.push(this.categoryList.find(elem => elem.id.toString() === id.toString()));
    }
  }

  avoidModified({ target }) {
    const { id } = target;
    if (target.checked) {
      this.avoidList.push(this.categoryList.find(elem => elem.id.toString() === id.toString()));
      this.needListToShow = [...this.needListToShow.filter(elem => elem.id.toString() !== id.toString())]
    } else {
      this.avoidList = [...this.categoryList.filter(category => category.id.toString() !== id.toString())];
      this.needListToShow.push(this.categoryList.find(elem => elem.id.toString() === id.toString()));
    }
  }

  manageDefaultChecks(){
    const avoidFilterInputs = [].slice.call(this.shadowRoot.querySelector('.avoid-filter').querySelectorAll('input'));
    const needFilterInputs = [].slice.call(this.shadowRoot.querySelector('.need-filter').querySelectorAll('input'));
    avoidFilterInputs.map(element => {
      if(this.avoidList.includes(parseInt(element.id))){
        element.checked = true;
      }
      if(this.needList.includes(parseInt(element.id))){
        element.parentElement.remove();
      }
    });

    needFilterInputs.map(element => {
      if(this.needList.includes(parseInt(element.id))){
        element.checked = true;
      }
      if(this.avoidList.includes(parseInt(element.id))){
        element.parentElement.remove();
      }
    });
  }

}

customElements.define('need-avoid', NeedAvoid);