// js/funciones.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formContacto');

    if (form) {
        form.addEventListener('submit', (e) => {
            const valido = validarTodosLosCampos(form);
            if (!valido) {
                e.preventDefault(); // 🚫 detiene el envío si hay errores
            }
        });
    }
});

function validarTodosLosCampos(form) {
    // Limpia errores previos
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    form.querySelectorAll('.invalid-feedback').forEach(el => el.remove());

    const campos = form.querySelectorAll('input, textarea');
    const vacios = [];

    campos.forEach((campo) => {
        const valor = (campo.value || '').trim();
        const esRequerido = campo.hasAttribute('required');

        if (esRequerido && valor === '') {
            const label = form.querySelector(`label[for="${campo.id}"]`);
            const nombre = (label?.textContent || campo.name || campo.id).trim();

            vacios.push(nombre);

            campo.classList.add('is-invalid');
            const fb = document.createElement('div');
            fb.className = 'invalid-feedback';
            fb.textContent = `El campo ${nombre} es obligatorio.`;
            campo.parentElement.appendChild(fb);
        }
    });

    // Mostrar resumen
    const alertas = document.getElementById('alertas');
    alertas.innerHTML = '';
    if (vacios.length) {
        const lista = vacios.map(v => `<li>${v}</li>`).join('');
        alertas.innerHTML = `
      <div class="alert alert-danger">
        <strong>Faltan los siguientes campos:</strong>
        <ul>${lista}</ul>
      </div>`;
    } else {
        alertas.innerHTML = `<div class="alert alert-success">Formulario válido ✅</div>`;
    }

    return vacios.length === 0;
}
