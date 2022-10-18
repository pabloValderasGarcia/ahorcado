var ahorcado = ahorcado || {};

ahorcado.palabraOculta = '';
ahorcado.vida = 8;
ahorcado.win = false;

ahorcado.Ahorcado = class {

    constructor() {
        this.letra = '';
        this.letras = '';
        this.palabra = '';
    }
    
    generarVida() {
        document.getElementById('vida').innerHTML = 'Vida: ' + ahorcado.vida + ' / 8';
    }

    generarResultado($res) {
        document.getElementById('todo').style.display = 'none';
        document.getElementById('recarga').style.visibility = 'visible';
        let resultado = document.getElementById('resultado');
        let palabra = document.getElementById('palabraFinal');
        resultado.style.color = 'red';
        resultado.style.margin = '10% 0 0 36.5%';
        resultado.style.fontSize = '60px';
        resultado.style.fontWeight = 'bold';
        palabra.style.margin = '0 0 0 36.5%';
        palabra.style.fontSize = '20px';
        palabra.style.fontWeight = 'bold';
        palabra.innerHTML = 'Palabra: ' + this.palabra;
        if ($res == 0 && ahorcado.win != true) {
            resultado.innerHTML = 'HAS PERDIDO';
        } else {
            resultado.innerHTML = 'HAS GANADO';
        }
    }

    generarLetras() {
        let cont = 97;
        while (cont <= 122) {
            this.letras += String.fromCharCode(cont);
            cont++;
        }
    }

    generarTeclado() {
        this.generarLetras();
        let cont = 0;

        while (cont < this.letras.length) {
            this.letra = this.letras[cont];
            let div = document.createElement('div');
            div.className = 'letra letra' + cont;
            div.innerHTML = this.letra;
            document.getElementById('teclado').appendChild(div);
            cont++;
        }
    }

    activarBotones() {
        document.querySelectorAll('.letra').forEach(element => {
            element.onclick = () => {
                document.getElementById('escribir').innerHTML = element.textContent;
                element.style.backgroundColor = 'rgb(54, 54, 54)';
                element.style.pointerEvents = 'none';
                if (this.comprobarLetra()) {
                    this.generarVida();
                } else {
                    ahorcado.vida--;
                    this.generarVida();
                }
                if (ahorcado.vida == 0) {
                    this.generarResultado(0);
                }
            }
        })
    }

    generarPalabra() {
        let palabras = [];

        palabras[0] = 'ELEFANTE'; palabras[1] = 'PUERTA';
        palabras[2] = 'ORDENADOR'; palabras[3] = 'TECLA';
        palabras[4] = 'PABLO'; palabras[5] = 'CODIGO';
        palabras[6] = 'AVION'; palabras[7] = 'MUSK';
        palabras[8] = 'COMIDA'; palabras[9] = 'FARO';
        palabras[10] = 'EXTERNO'; palabras[11] = 'GRANJA';
        palabras[12] = 'CUERVO'; palabras[13] = 'CUADRO';
        palabras[14] = 'FIERA'; palabras[15] = 'GATO';
        palabras[16] = 'ZORRO'; palabras[17] = 'PERRO';
        palabras[18] = 'METRO'; palabras[19] = 'CIGARRO';
        palabras[20] = 'FORMULA';

        this.palabra = palabras[Math.floor(Math.random() * (palabras.length))];

        ahorcado.palabraOculta = this.palabra.charAt(0);

        for (let i = 1; i < this.palabra.length; i++) {
            ahorcado.palabraOculta += ' _';
        }

        document.getElementById('palabra').innerHTML = ahorcado.palabraOculta;
    }

    comprobarLetra() {
        let letra = document.getElementById('escribir').textContent.toUpperCase();
        if (this.palabra[0] != letra) {
            if (this.palabra.includes(letra)) {
                ahorcado.palabraOculta = ahorcado.palabraOculta.split(' ');
                for (let i = 1; i < this.palabra.length; i++) {
                    if (letra == this.palabra[i]) {
                        ahorcado.palabraOculta[i] = letra;
                    }
                }
                ahorcado.palabraOculta = ahorcado.palabraOculta.join(' ');
                if (ahorcado.palabraOculta.replaceAll(' ', '') == this.palabra) {
                    ahorcado.win = true;
                    this.generarResultado(1);
                }
                document.getElementById('palabra').innerHTML = ahorcado.palabraOculta;
                return true;
            }
        } else {
            return false;
        }
    }

    jugar() {
        this.generarVida();
        this.generarTeclado();
        this.activarBotones();
        this.generarPalabra();
    }

}