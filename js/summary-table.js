class PaymentSummaryTable extends HTMLElement {
    connectedCallback(){
            this.innerHTML = '<div class="summary-table">                       <div class="cart_summary-table">                                    <span class="summary-back-to-cart">                                         <a href="./carrito.html">Volver a carrito</a></span>                                                            <span class="summary-title">Resumen de la compra</span>         <br>    <hr>                                                                <div class="recipe-coupon">                                     <label>USAR CUPÓN DE DESCUENTO</label>                          <br>                                                                <div class="coupon-code">                                           <input type="text" placeholder="Código">                                            <button class="add-coupon">Añadir</button>                                                             </div>                                                                </div>                                                              <br>                                                                <hr class="recipe-hr">                                              <div class="summary-product-prices">                                    <div class="recipe-title">Subtotal</div>                                                            <div class="recipe-price"><span>$ precio</span></div>               <div class="recipe-title">Descuentos</div>                          <div class="recipe-price"><span>$ subtotal</span></div>             <div class="recipe-title">Gastos del envío</div>                    <div class="recipe-price"><span>$ envio</span></div>                                                                <hr class="recipe-hr">                                          <div class="recipe-title"><span class="total-price">Total</span></div>                                                              <div class="recipe-price"><span class="total-price">$ total</span></div></div></div></div>'
    }
}


class CartSummaryTable extends HTMLElement {
    connectedCallback(){

            this.innerHTML = '<div id="cart-summary-table" class="summary-table"><span class="summary-title">Resumen de la compra</span><br><hr><div class="recipe-coupon"><label>USAR CUPÓN DE DESCUENTO</label><br><div class="coupon-code"><input type="text" placeholder="Código"><button class="add-coupon">Añadir</button></div></div><br><hr class="recipe-hr"><div class="summary-product-prices"><div class="recipe-title">Subtotal</div><div class="recipe-price"><span>$ precio</span></div><div class="recipe-title">Descuentos</div><div class="recipe-price"><span>$ subtotal</span></div><div class="recipe-title">Gastos del envío</div><div class="recipe-price"><span>$ envio</span></div><hr class="recipe-hr"><div class="recipe-title"><span class="total-price">Total</span></div><div class="recipe-price"><span class="total-price">$ total</span></div></div><hr class="recipe-hr"><div class="go-confirm-purchase"><a href="./identificacion.html"><button>CONFIRMAR COMPRA</button></a></div><div class="continue-shopping"><a href="./index.html">O continúa comprando</a></div></div>'
    }
}

customElements.define('payment-summary-table', PaymentSummaryTable);
customElements.define('cart-summary-table', CartSummaryTable);
