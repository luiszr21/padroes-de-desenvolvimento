class ProcessarPedidoOnline {
  processar() {
    console.log("Validando pagamento do pedido online...");
    console.log("Separando itens no estoque...");
    console.log("Enviando pedido pelos Correios...");
    console.log("Pedido online finalizado!");
  }
}

class ProcessarPedidoPresencial {
  processar() {
    console.log("Registrando pagamento no caixa...");
    console.log("Entregando produto ao cliente...");
    console.log("Pedido presencial finalizado!");
  }
}
const pedidoOnline = new ProcessarPedidoOnline();
pedidoOnline.processar();

const pedidoPresencial = new ProcessarPedidoPresencial();
pedidoPresencial.processar();