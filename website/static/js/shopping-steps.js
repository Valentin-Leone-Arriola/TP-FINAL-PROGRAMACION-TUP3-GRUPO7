class ShoppingSteps extends HTMLElement {
    connectedCallback(){
        this.innerHTML = '<br>                                              <div class="shopping-steps">                                        <span class="step-carrito"><img src="./static/img/steps-arrow.png"> Carrito</span>                                                                <span class="step-identificacion"><img src="./static/img/steps-arrow.png"> Identificación</span>                                                                <span class="step-entrega"><img src="./static/img/steps-arrow.png"> Entrega</span>                                                               <span class="step-pago"><img src="./static/img/steps-arrow.png"> Pago</span>                                                                  <span class="step-confirmacion"><img src="./static/img/steps-arrow.png"> Confirmación</span>                                                                  </div>'
    }
}

customElements.define('shopping-steps', ShoppingSteps);