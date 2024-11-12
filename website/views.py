from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_login import  current_user
from . import db


views = Blueprint('views', __name__)


@views.route('/')
def home():
    from . import Producto 
    lista_productos = Producto.query.limit(6).all()
    return render_template('index.html', productos =  lista_productos ) 

@views.route('/nav')
def nav():
    from . import Producto 
    productos = Producto.query.all()
    return render_template('nav.html', productos = productos) 


@views.route('/producto/<int:producto_id>', endpoint='product-view')
def product_view(producto_id):
    from . import Producto 
    item = Producto.query.filter_by(id = producto_id).first()
    productos = Producto.query.filter(Producto.id != producto_id).limit(4).all()
    return render_template('product-view.html', item = item, productos = productos)

   

@views.route("/carrito")
def carrito():
    from . import Carrito, Producto
    usuario_id = current_user.id
    carrito_items = Carrito.query.filter_by(usuario_id = usuario_id).all()
    productos = []
    total_final = 0
    for item in carrito_items:
        producto = Producto.query.get(item.producto_id)
        producto.cantidad = item.cantidad
        total_final += producto.precio * producto.cantidad
        productos.append(producto)
    return render_template('carrito.html', carrito = productos, total_final = total_final)



@views.route('/<int:producto_id>/agregar_carrito', methods=["POST", "GET"])
def agregar_al_carrito(producto_id):
    from . import Carrito, Producto
    if current_user.is_authenticated: 
        usuario_id = current_user.id
        carrito_item = Carrito.query.filter_by(producto_id = producto_id, usuario_id=usuario_id).first()
        producto = Producto.query.get(producto_id)
        if not producto or producto.cantidad <= 0:
            flash('El producto no está disponible en stock', category='error')
            return redirect(url_for('views.product-view'))
        if carrito_item:
            carrito_item.cantidad += 1
            carrito_item.guardarCarrito()
        else:
            carrito = Carrito(producto_id = producto_id, usuario_id = usuario_id, cantidad = 1)
            carrito.guardarCarrito()
    else:
        flash('Necesitas iniciar sesion para agregar productos al carrito', category='error')
        return redirect(url_for('auth.login'))
    return redirect(url_for('views.carrito'))


@views.route('/carrito/<int:producto_id>/eliminar', methods=["POST", "GET"])
def eliminar_producto_carrito(producto_id):
    from . import Carrito 
    usuario_id = current_user.id
    carrito_item = Carrito.query.filter_by(producto_id = producto_id, usuario_id = usuario_id).first()

    if not carrito_item:
        return redirect(url_for('views.carrito'))

    if carrito_item.cantidad > 1:
        carrito_item.cantidad -= 1
        carrito_item.guardarCarrito()
    else:
        carrito_item.eliminarCarrito()

    return redirect(url_for('views.carrito'))



@views.route('/carrito/eliminar', methods=["POST", "GET"])
def eliminar_carrito():
    from . import Carrito 
    usuario_id = current_user.id
    carrito_items = Carrito.query.filter_by(usuario_id = usuario_id).all()

    for item in carrito_items :
        item.eliminarCarrito()

    return redirect(url_for('views.carrito'))




@views.route('/confirm-purchase')
def confirm_purchase():

    return render_template('confirm-purchase.html')

@views.route('/contacto')
def contacto():

    return render_template('contact.html')

@views.route('/preguntas')
def preguntas():

    return render_template('preguntas-frecuentes.html')

@views.route('/politica')
def politica():

    return render_template('politica-privacidad.html')
@views.route('/shipment')
def shipment():

    return render_template('shipment.html')



@views.route('/agregar', methods=['GET', 'POST'])
def agregar_producto():
    from . import Producto 
    if request.method == 'POST':
        nombre = request.form.get('nombre')
        img_url = request.form.get('imagen')
        precio = float(request.form.get('precio'))
        cantidad = int(request.form.get('cantidad'))
        
        if precio<=0:
            flash("El precio y la cantidad deben ser mayores a 0", category = 'error')
        elif cantidad<=0:
            flash("El precio y la cantidad deben ser mayores a 0", category = 'error')
        else:
            flash("Producto agregado exitosamente", category = 'exitoso')
            nuevo_producto = Producto(nombre, img_url, precio, cantidad)
            nuevo_producto.guardarProducto()
            print(nuevo_producto.id)

    return render_template('agregar_producto.html')
        
        
@views.route('/eliminar', methods = ['GET', 'POST'])
def eliminar():
    from . import Producto 
    productos = Producto.query.all()
    if request.method == 'POST':
        # Obtenemos los datos del form
        id = request.form.get('id')
        cantidad_str = request.form.get('cantidad')
        
        # Validamos que se ingresen valores
        if not id or not cantidad_str:
            flash("Faltan datos para completar la operación.", category='error')
            return redirect(url_for('views.eliminar')) 

        try:  #intentamos convertir los datos a enteros, si nos da error muestra mensaje
            id = int(id)
        except ValueError:
            flash("El id debe ser un número entero.", category='error')
            return redirect(url_for('views.eliminar')) 
        
        try:
            cantidad = int(cantidad_str)
        except ValueError:
            flash("La cantidad debe ser un número entero.", category='error')
            return redirect(url_for('views.eliminar'))  
         

       
        producto = Producto.query.filter_by(id=id).first()
        
        if not producto:
            flash("Producto no encontrado.", category='error')
            return redirect(url_for('views.eliminar')) 

        # Chequeamos si la cantidad del producto es mayor a la que se queire eliminar
        if producto.cantidad > cantidad:
            producto.actualizarCantidad(cantidad)
            flash(f"Cantidad actualizada correctamente. Nuevo stock: {producto.cantidad}.", category='exitoso')
        elif producto.cantidad == cantidad:
            # Si tiejen la misma cantidad lo elimina
            producto.eliminarProducto()  
            flash("Producto eliminado correctamente.", category='exitoso')
            return redirect(url_for('views.eliminar'))
        else:
            flash("No hay suficiente stock para eliminar esa cantidad.", category='error')

    return render_template('eliminar_producto.html', productos = productos)


@views.route('/borrar-user', methods = ['GET', 'POST'])
def borrar_user():
    from . import Usuario
    usuario_email = request.form.get('email')
    usuario_eliminar = Usuario.query.filter_by(email = usuario_email ).first()
    if usuario_eliminar: 
        db.session.delete(usuario_eliminar)
        db.session.commit()
        flash('Usuario eliminado', category = 'exitoso')
        return redirect(url_for('views.borrar_user'))
    else:
        flash('No puede eliminarse ese usuario porque no existe', category = 'error')
        
    return render_template('eliminar_usuario.html')
    