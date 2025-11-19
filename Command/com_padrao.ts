interface Command {
  execute(): void;
}

class LigarLampada implements Command {
  constructor(private lamp: Lampada) {}
  execute() {
    this.lamp.ligar();
  }
}

class Lampada {
  ligar() {
    console.log("Ligar");
  }
}

class Botao {
  constructor(private command: Command) {}
  clicar() {
    this.command.execute();
  }
}

const botao = new Botao(new LigarLampada(new Lampada()));
botao.clicar(); // Ligar
