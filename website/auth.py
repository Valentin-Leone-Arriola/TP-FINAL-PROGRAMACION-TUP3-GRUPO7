from flask import Blueprint, render_template,request,flash,redirect,url_for
from flask_login import  login_required, login_user, logout_user, current_user
from werkzeug.security import  check_password_hash
from . import db
auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET', 'POST']) # Cuando mandamos el form utiliza POST porque así lo dice el form, cuando se recarga la pagina una GET
def login():
    from . import Usuario
    if request.method == 'POST':
        email = request.form.get('email')
        contrasena = request.form.get('contrasena')
        usuario_logged = Usuario.query.filter_by(email=email).first()
    
        if usuario_logged:  
            if check_password_hash(usuario_logged.contrasena, contrasena):
                flash('Inicio de sesion exitosa', category='exitoso')
                login_user(usuario_logged)
                return redirect(url_for('views.home'))
            else:
                flash('Contraseña incorrecta. Intentelo nuevamente', category='error')
        else:
            flash('No hay una cuenta asociada a ese correo electronico', category='error')
    return render_template('login.html')
@auth.route('/logout', methods=['GET', 'POST'])

@auth.route('/logout', methods=["GET"])
@login_required
def logoutRoute():
    logout_user()
    return redirect(url_for('views.home'))

@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    from . import Usuario
    if request.method =='POST':
        email = request.form.get('email')
        nombre = request.form.get('nombre')
        contrasena1 = request.form.get('contrasena1')
        contrasena2 = request.form.get('contrasena2')
        usuario_logged = Usuario.query.filter_by(email=email).first()

        if usuario_logged:
            flash('Ya existe una cuenta asociada a ese correo electronico', category='error')
        elif len(nombre) < 2 or len(nombre)>15:
            flash('Nombre debe ser mayor a 2 caracteres', category='error')   
        elif len(contrasena1) < 4:
            flash('Contraseña debe ser mayor a 4 caracteres', category='error')
        elif contrasena2 != contrasena1:
            flash('Las contraseñas deben coincidir', category='error')
        else:
            nuevo_usuario = Usuario(nombre, email, contrasena2)
            nuevo_usuario.guardarUsuario()
            flash('Cuenta creada. Inicia sesion', category='exitoso')
            return redirect(url_for('auth.sign_up'))
    
    return render_template('register.html')



@auth.route('/admin', methods = ['GET', 'POST'])
@login_required
def hacer_admin():
    from . import Usuario
    if request.method == 'POST':
        usuario_id = current_user.id
        usuario = Usuario.query.filter_by(id = usuario_id).first()
        contrasena = request.form.get('contrasena_admin')
        if contrasena != '98765':
            flash('Contraseña invalida', category='error')
        else:
            flash('Ahora ese administrador', category='exitoso')
            usuario.admin = True
            db.session.commit()
            
            return redirect(url_for('views.home'))
    
    return render_template('admin_register.html')