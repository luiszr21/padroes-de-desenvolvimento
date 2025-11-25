// Classe abstrata que define o esqueleto do algoritmo
abstract class ProcessarPedidoTemplate {
  processar() {
    this.validarPagamento();
    this.entregarPedido();
    this.finalizar();
  }

  abstract validarPagamento(): void;
  abstract entregarPedido(): void;

  private finalizar() {
    console.log("Pedido finalizado!\n");
  }
}

// Pedido Online
class ProcessarPedidoOnline extends ProcessarPedidoTemplate {
  validarPagamento() {
    console.log("Validando pagamento do pedido online...");
  }

  entregarPedido() {
    console.log("Enviando pedido pelos Correios...");
  }
}

// Pedido Presencial
class ProcessarPedidoPresencial extends ProcessarPedidoTemplate {
  validarPagamento() {
    console.log("Registrando pagamento no caixa...");
  }

  entregarPedido() {
    console.log("Entregando produto ao cliente...");
  }
}

const online = new ProcessarPedidoOnline();
online.processar();

const presencial = new ProcessarPedidoPresencial();
presencial.processar();