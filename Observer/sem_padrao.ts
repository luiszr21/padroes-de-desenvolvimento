class Termometro {
  setTemperatura(t: number) {
    console.log("Nova temp:", t);
    sensor1.alertar(t);
    sensor2.alertar(t);
  }
}

class Sensor {
  alertar(t: number) {
    console.log("Sensor recebeu:", t);
  }
}

const sensor1 = new Sensor();
const sensor2 = new Sensor();
new Termometro().setTemperatura(30);
