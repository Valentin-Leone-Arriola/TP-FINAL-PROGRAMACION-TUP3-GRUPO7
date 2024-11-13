const form = document.getElementById("form");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const dni = document.getElementById("dni");
const tel = document.getElementById("tel");

const errorNombre = document.getElementById("error-nombre");
const errorApellido = document.getElementById("error-apellido");
const errorDNI = document.getElementById("error-dni");
const errorTel = document.getElementById("error-tel");


function limpiarErrores() {
  errorNombre.innerHTML = "";
  errorApellido.innerHTML = "";
  errorDNI.innerHTML = "";
  errorTel.innerHTML = "";
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
    errorNombre.innerHTML = "";
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
  
apellido.addEventListener("input", function () {
    errorApellido.innerHTML = "";
    if (
        validarCampo(
        errorApellido,
        apellido.value.length < 3 || apellido.value == "",
        "El apellido debe tener al menos 3 caracteres"
        )
    ) {
        return;
    }
    if (
        validarCampo(
        errorApellido,
        !apellido.value.match(/^[0-9a-z]+$/i),
        "No se permiten caracteres especiales."
        )
    ) {
        return;
    }
});

dni.addEventListener("input", function () {
    errorDNI.innerHTML = "";
    if (
        validarCampo(
        errorDNI,
        dni.value.length < 7 || dni.value.length > 8,
        "El DNI debe tener entre 7 u 8 dígitos"
        )
    ) {
        return;
    }
});

tel.addEventListener("input", function () {
    errorTel.innerHTML = "";
    if (
        validarCampo(
        errorTel,
        !tel.value.match(/^(?:\+?54)?\s*9?\s*0?\d{2,4}\s*\d{3}\s*\d{3,5}$/i) || tel.value.length < 10 || tel.value.length > 18,
        "El teléfono ingresado no es válido"
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

    // Nombre
    if (nombre.value.length < 3 || nombre.value === "") {
        errorNombre.innerHTML = "El nombre debe tener al menos 3 caracteres";
        errores = true;
    }

    if (!nombre.value.match(/^[0-9a-z]+$/i)) {
        errorNombre.innerHTML = "No se permiten caracteres especiales.";
        errores = true;
    }

    // Apellido
    if (apellido.value.length < 3 || apellido.value === "") {
        errorApellido.innerHTML = "El apellido debe tener al menos 3 caracteres";
        errores = true;
    }

    if (!apellido.value.match(/^[0-9a-z]+$/i)) {
        errorApellido.innerHTML = "No se permiten caracteres especiales.";
        errores = true;
    }

    // DNI
    if (dni.value.length < 7 || dni.value.length > 8){
        errorDNI.innerHTML = "El DNI debe tener entre 7 y 8 dígitos";
        return;
    }

    // Telefono
    if (!tel.value.match(/^(?:\+?54)?\s*9?\s*0?\d{2,4}\s*\d{3}\s*\d{3,5}$/i) || tel.value.length < 10 || tel.value.length > 18) {
    errorTel.innerHTML = "El teléfono ingresado no es válido";
    errores = true;

}

if (!errores) {
    // Submit forzado si no hay errores
    form.submit();
}
});
