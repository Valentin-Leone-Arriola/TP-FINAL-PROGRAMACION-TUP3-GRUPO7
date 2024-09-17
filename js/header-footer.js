class SpecialHeader extends HTMLElement {
    connectedCallback(){
        this.innerHTML = '<header><div id="menu"><a href="./developing-menu.html"><img src="./resources/img/menu.png" alt="menu" title="Menu"></a></div><div id="logo"><a href="./index.html"><img src="./resources/img/logo.gif" alt="logo"></a></div><div id="utilities"><input type="search" placeholder="Buscar"><a href="./login.html"><img src="./resources/img/user.png" alt="usuario" title="Usuario"></a><a href="./carrito.html"><img src="./resources/img/shopping-bag.png" alt="carrito" title="Carrito"></a></div></header>'
    }
}

class SpecialFooter extends HTMLElement {
    connectedCallback(){
        this.innerHTML = '<span class="original-reference">©2024 Grupo 7. Esta página está basada en el diseño de <a href="https://www.harveywillys.com/">HarveyWillys</a>, tienda de ropa.</span>'
    }
}


customElements.define('special-header', SpecialHeader);
customElements.define('special-footer', SpecialFooter)
