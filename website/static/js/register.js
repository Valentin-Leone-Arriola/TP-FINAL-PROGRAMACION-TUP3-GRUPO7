const form = document.getElementById("form");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const contrasena1 = document.getElementById("contrasena1");
const contrasena2 = document.getElementById("contrasena2");

const errorNombre = document.getElementById("error-nombre");
const errorEmail = document.getElementById("error-email");
const errorContrasena1 = document.getElementById("error-password");
const errorContrasena2 = document.getElementById("error-password2");


function limpiarErrores() {
  errorNombre.innerHTML = "";
  errorEmail.innerHTML = "";
  errorContrasena1.innerHTML = "";
  errorContrasena2.innerHTML = "";
}

// Función para validar segun parametros
function validarCampo(campo, validacion, mensajeError) {
    if (validacion) {
      campo.innerHTML = mensajeError;
    }
  
    return validacion;
  }
  
// Eventos Change
nombre.addEventListener("input", function () {
    limpiarErrores();
    if (
        validarCampo(
        errorNombre,
        nombre.value.length < 3 || nombre.value == "",
        "El nombre debe tener al menos 3 caracteres"
        )
    ) {
        return;
    }
    if (
        validarCampo(
        errorNombre,
        !nombre.value.match(/^[0-9a-z]+$/i),
        "No se permiten caracteres especiales."
        )
    ) {
        return;
    }
});
  
contrasena1.addEventListener("input", function () {
    limpiarErrores();
    if (
        validarCampo(
        errorContrasena1,
        contrasena1.value.length < 6 || contrasena1.value.length > 12,
        "La contraseña debe tener entre 6 y 12 caracteres"
        )
    ) {
        return;
    }
});

contrasena2.addEventListener("input", function () {
    limpiarErrores();
    if (
        validarCampo(
        errorContrasena2,
        contrasena2.value !== contrasena1.value,
        "Las contraseñas deben coincidir"
        )
    ) {
        return;
    }
});

// Submit
form.addEventListener("submit", function (event) {
    event.preventDefault();

    //Limpia mensajes de error
    limpiarErrores();
    let errores = false;

    if (nombre.value.length < 3 || nombre.value === "") {
        errorNombre.innerHTML = "El nombre debe tener al menos 3 caracteres";
        errores = true;
    }

    if (!nombre.value.match(/^[0-9a-z]+$/i)) {
        errorNombre.innerHTML = "No se permiten caracteres especiales.";
        errores = true;
    }

    // Email
    if (!email.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)) {
        errorEmail.innerHTML = "El correo ingresado no es valido";
        errores = true;
    }

    // Contraseña
    if (contrasena1.value.length < 6 || contrasena1.value.length > 12) {
        errorContrasena1.innerHTML = "La contraseña debe tener entre 6 y 12 caracteres";
        errores = true;
    }

    if (contrasena1.value !== contrasena2.value) {
        errorContrasena1.innerHTML = "Las contraseñas deben coincidir";
        errorContrasena2.innerHTML = "Las contraseñas deben coincidir";
        errores = true;
    }


if (!errores) {
    // Submit forzado si no hay errores
    form.submit();
}
});
