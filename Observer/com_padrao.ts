interface Observer {
  update(t: number): void;
}

class Termometro {
  private observers: Observer[] = [];

  subscribe(o: Observer) {
    this.observers.push(o);
  }

  setTemperatura(t: number) {
    console.log("Nova temp:", t);
    this.observers.forEach(o => o.update(t));
  }
}

class Sensor implements Observer {
  update(t: number) {
    console.log("Sensor recebeu:", t);
  }
}

const term = new Termometro();
term.subscribe(new Sensor());
term.subscribe(new Sensor());

term.setTemperatura(30);
