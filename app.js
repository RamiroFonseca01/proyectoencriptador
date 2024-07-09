const encriptarBtn = document.getElementById("encriptar");
const desencriptarBtn = document.getElementById("desencriptar");
const copiarBtn = document.getElementById("copiar");
const limpiarBtn = document.getElementById("limpiar");
const texto = document.getElementById("texto");
const resultContainer = document.querySelector(".result-container");

// Objeto que contiene las llaves de encriptación
const llavesEncriptacion = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

// Objeto que contiene las llaves de desencriptación (inverso de llavesEncriptacion)
const llavesDesencriptacion = Object.fromEntries(
  Object.entries(llavesEncriptacion).map(([key, value]) => [value, key])
);

// Función para encriptar el texto
function encriptar() {
  const textoEncriptado = texto.value
    .toLowerCase()
    .replace(/[aeiou]/g, (letra) => llavesEncriptacion[letra]);
  mostrarResultado(textoEncriptado);
}

// Función para desencriptar el texto
function desencriptar() {
  const textoDesencriptado = texto.value.replace(
    /enter|imes|ai|ober|ufat/g,
    (palabra) => llavesDesencriptacion[palabra]
  );
  mostrarResultado(textoDesencriptado);
}

// Función para mostrar el resultado en el contenedor y habilitar/deshabilitar el botón de copiar
function mostrarResultado(textoResultado) {
  if (textoResultado.trim() === "") {
    // Mostrar el mensaje de "Ningún mensaje fue encontrado"
    resultContainer.innerHTML = `<img src="./img/Muneco.png" alt=""><div class="mensaje"><h2>Ningún mensaje fue encontrado</h2><p>Ingresa el texto que desees encriptar o desencriptar.</p></div>`;
    copiarBtn.disabled = true; // Deshabilitar el botón de copiar
  } else {
    resultContainer.textContent = textoResultado;
    copiarBtn.disabled = false; // Habilitar el botón de copiar
  }
}

// Función para copiar el resultado al portapapeles
function copiar() {
  const textArea = document.createElement("textarea");
  textArea.value = resultContainer.textContent;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

// Event listeners para los botones
encriptarBtn.addEventListener("click", encriptar);
desencriptarBtn.addEventListener("click", desencriptar);
copiarBtn.addEventListener("click", copiar);
limpiarBtn.addEventListener("click", () => {
  texto.value = "";
  mostrarResultado(""); // Limpiar el resultado y mostrar el mensaje de "Ningún mensaje..."
});
