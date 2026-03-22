const modelViewer = document.querySelector('#visor-3d');

const CONFIG = {
    distancia: "10m",      // Ajusta según tu modelo
    velocidad: 1.5,        // Grados por frame
    tiempoPausa: 10000      // 5 segundos
};

let anguloActual = 0;
let gradosRecorridos = 0; 
let estaEnPausa = false;

const animar = () => {
    if (estaEnPausa) return;

    // Sumamos la velocidad al ángulo y al contador de esta vuelta
    anguloActual += CONFIG.velocidad;
    gradosRecorridos += CONFIG.velocidad;

    // Aplicamos el movimiento
    modelViewer.cameraOrbit = `${anguloActual}deg 90deg ${CONFIG.distancia}`;

    // ¿Ya recorrimos una vuelta completa (360°)?
    if (gradosRecorridos >= 360) {
        estaEnPausa = true;
        gradosRecorridos = 0; // Reseteamos el contador para la próxima vuelta

        // Esperamos los 5 segundos
        setTimeout(() => {
            estaEnPausa = false;
            // IMPORTANTE: Volvemos a llamar a la animación
            requestAnimationFrame(animar);
        }, CONFIG.tiempoPausa);
    } else {
        // Si no ha llegado a 360, sigue girando
        requestAnimationFrame(animar);
    }
};


// Iniciar solo cuando el modelo esté listo
modelViewer.addEventListener('load', () => {
    animar();
});

//textura
