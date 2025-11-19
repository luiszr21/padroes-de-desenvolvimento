class Lampada {
  ligar() {
    console.log("Ligar");
  }
  desligar() {
    console.log("Desligar");
  }
}

class Botao {
  constructor(private lamp: Lampada) {}

  clicar() {
    this.lamp.ligar(); // Botão está travado nessa ação
  }
}

const b = new Botao(new Lampada());
b.clicar();
