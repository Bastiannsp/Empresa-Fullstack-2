function validarFormulario() {
    console.log("Validando formulario")
    let nombre = document.getElementById("nombre").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let mensaje = document.getElementById("mensaje").value.trim();
    let alertas = document.getElementById("alertas");
    alertas.innerHTML = "";
    if (nombre === "" || correo === "" || mensaje === "") {
        alertas.innerHTML = `<div class="alert alert-danger">Todos los campos son obligatorios</div>`;
    } else {
        alertas.innerHTML = `<div class="alert alert-success">Formulario enviado correctamente ✅</div>`;
    }
}

