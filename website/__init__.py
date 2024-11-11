from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta
from flask_login import LoginManager
from flask_login import UserMixin
from werkzeug.security import generate_password_hash
 
db=SQLAlchemy()




    
    
class Usuario (db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(45), nullable=False)
    email = db.Column(db.String(150), nullable=False, unique=True)
    contrasena = db.Column(db.String, nullable=False)
    admin = db.Column(db.Boolean, default=False)

    def __init__(self, nombre, email, contrasena):
        self.nombre = nombre
        self.email = email
        self.contrasena = generate_password_hash(contrasena)

    def guardarUsuario(self):
        db.session.add(self)
        db.session.commit()
        
    def hacerAdmin(self):
        self.admin = True
        db.session.commit()
        
  
    
    
    

class Carrito (db.Model):
    id = db.Column(db.Integer, primary_key = True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable = False)
    producto_id = db.Column(db.Integer, db.ForeignKey('producto.id'), nullable = False)
    cantidad = db.Column(db.Integer, default = 1)

    def __init__(self, usuario_id, producto_id, cantidad = 1):
        self.usuario_id = usuario_id
        self.producto_id = producto_id
        self.cantidad =cantidad

    def actualizarCantidad(self, cantidad):
        self.cantidad += cantidad
        db.session.commit()

    def guardarCarrito(self):
        db.session.add(self)
        db.session.commit()

    def eliminarCarrito(self):
        db.session.delete(self)
        db.session.commit()


    
class Producto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    img_url = db.Column(db.String, nullable=False)
    precio =db.Column(db.Float, nullable=False)
    cantidad =  db.Column(db.Integer, nullable=False)

    def __init__(self, nombre, img_url, precio, cantidad):
        self.nombre = nombre
        self.img_url = img_url
        self.precio = precio
        self.cantidad = cantidad

    def guardarProducto(self):
        db.session.add(self)
        db.session.commit()
        
    def eliminarProducto(self):
        db.session.delete(self)
        db.session.commit()
    
    def actualizarCantidad(self, cantidad):
        self.cantidad -= cantidad
        db.session.commit()
        
   



def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'l4c14v0'
    app.config['SQLALCHEMY_DATABASE_URI']= 'sqlite:///ecommerce7.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False
    app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)
    
    db.init_app(app)
    
    login_manager = LoginManager(app)
    
    login_manager.login_view = 'auth.login' #Si un usuario no autenticado intenta acceder a una ruta que necesita autenticacion, Flask-Login necesita saber a dónde redirigir al usuario para que inicie sesión.
    
    
    
    @login_manager.user_loader
    def load_user(user_id):
        return Usuario.query.get(user_id)

    from .views import views   
    from .auth import auth
        
    app.register_blueprint(views, url_prefix = '/')
    app.register_blueprint(auth, url_prefix = '/')
        
    
    return app

