// ============================================================
// COMPONENTE: tarjeta de sabor.
//
// Un componente es una FUNCIÓN que recibe datos y devuelve el
// HTML de una pieza de la interfaz. No sabe dónde se usa, no
// toca el estado global, no escucha eventos: solo DIBUJA.
//
//   crearTarjetaSabor(sabor, estaSeleccionado) -> string HTML
// ============================================================
function crearTarjetaSabor(sabor, estaSeleccionado) {
    const clases = [
        "tarjeta-sabor",
        estaSeleccionado ? "seleccionada" : "",
        sabor.Disponible ? "" : "agotada"
    ].join(" ").trim();

    return `
        <article class="${clases}" data-id="${sabor.IdSabor}">
            <span class="nombre-sabor">${sabor.Nombre}</span>
            ${sabor.Disponible
                ? `<span class="tilde">${estaSeleccionado ? "✓" : ""}</span>`
                : '<span class="cartel-agotado">AGOTADO</span>'
            }
        </article>
    `;
}
