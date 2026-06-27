// Base de datos de tus mensajes (¡Aquí cambias el texto por lo que tú quieras!)
const mensajesAmor = {
    1: "Te amo porque eres la persona más increíble que puedo conocer, ya que eres un solecito de persona ☀️ cálida y comprensiva, tu compañía puede cambiar por completo mis días pata bien, eres mi refugio favorito ♥️",
    2: "De verdad lo que siento por ti es puro y sincero todo de ti me encanta tus sentimientos y tu son woooow, es inevitable el verte y no sentir amor ti pero sobre todo ternura mi niña linda, mereces ser cuidada debidamente tratada con delicadeza aunque aveces falle en ello, amo como me escuchas y como logras en cada momento sea increíble como una aventura inolvidable 🌸🥺",
    3: "Brendita debe ser y estar plenamente y quiero ser parte de su vida, conocer sobre ella, sus gustos, sus miedos, sus pensamientos, sus sueños, sus metas, quiero saber su pasado, presente y futuro pero sobre todo quiero ser su futuro sin antes ser su presente por eso mismo 🥺 a través de este detalle quiero hacerte entender que eres mi primer pensamiento y el último en ir a dormir, que te digo incluso te sueño, a donde voy veo a Brendita la chica que se lleva mis suspiros y se gana mi corazón y sentimientos",
    4: "Yo soy tuyo y tu eres mía ❄️🐺Es curioso el como inicio esto contigo bonita mujer cuando menos lo esperaba llegaste tu con y con la excusa de enseñarte mi lengua las cosas escalaron sin ser forzadas, eres tu mi más bonita casualidad, es bonito tenerte en mi vida, ser nuestras vidas 💛 y créeme que luchare por cumplir las promesas y sueños que hablamos por ahí vales mil, por eso con toda seguridad puedo decir que TE AMO BRENDA YARET HERNANDEZ BAUTISTA ♥️🥰🫴🏽" 
};

// Función para simular el sonido de papel usando la tarjeta de audio del navegador
function simularSonidoPapel() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        
        const ctx = new AudioContext();
        const bufferSize = ctx.sampleRate * 0.15; // Duración corta
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        // Generar ruido blanco suave
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        // Filtro de banda para que suene más opaco, parecido a la fricción de papel
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1000;
        filter.Q.value = 2;
        
        // Control del volumen para que disminuya progresivamente (Fade-out)
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.1, ctx.currentTime); // Volumen bajo y tierno
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        noise.start();
    } catch (e) {
        console.log("El navegador bloqueó o no soporta el audio automático inicial.");
    }
}

// Función principal para abrir la carta
function abrirCarta(numero) {
    // Reproducir el sutil sonido de papel
    simularSonidoPapel();

    const modal = document.getElementById('modal-carta');
    const texto = document.getElementById('texto-carta');
    
    // Inyectar el mensaje correspondiente
    texto.innerText = mensajesAmor[numero];
    
    // Mostrar el modal centrado
    modal.style.display = 'flex';
}

// Función para cerrar la carta
function cerrarCarta() {
    const modal = document.getElementById('modal-carta');
    modal.style.display = 'none';
}

// Cerrar el modal automáticamente si hace clic fuera de la hoja de papel
window.onclick = function(event) {
    const modal = document.getElementById('modal-carta');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Variable para controlar si la música ya se está reproduciendo
let musicaIniciada = false;

function abrirCarta(numero) {
    // Reproducir el sutil sonido de papel
    simularSonidoPapel();

    // NUEVO: Iniciar la música de fondo al primer clic en un sobre
    const musica = document.getElementById('musica-fondo');
    if (!musicaIniciada && musica) {
        musica.volume = 0.4; // Ajusta el volumen aquí (0.0 es mudo, 1.0 es el máximo)
        musica.play().catch(error => {
            console.log("El navegador bloqueó la reproducción automática: ", error);
        });
        musicaIniciada = true; // Evita que se reinicie la canción en los siguientes clics
    }

    const modal = document.getElementById('modal-carta');
    const texto = document.getElementById('texto-carta');
    
    // Inyectar el mensaje correspondiente
    texto.innerText = mensajesAmor[numero];
    
    // Mostrar el modal centrado
    modal.style.display = 'flex';
}