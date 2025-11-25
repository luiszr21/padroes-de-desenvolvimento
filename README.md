# 🧩 Padrão de Projeto: Command

## 📘 Resumo Técnico
O padrão **Command** encapsula uma ação dentro de um objeto, permitindo que operações sejam tratadas como entidades independentes.  
Ele separa quem solicita a ação (**Invoker**) de quem executa (**Receiver**), tornando o sistema flexível e com baixo acoplamento.

---

## 🎯 Objetivo
- Encapsular requisições em objetos.
- Reduzir o acoplamento entre interface e lógica.
- Permitir armazenar, enfileirar, registrar e desfazer comandos.

---

## 🏗 Estrutura Geral
- **Command** — Interface com o método `execute()`.
- **ConcreteCommand** — Implementa ações específicas.
- **Invoker** — Solicita a execução do comando.
- **Receiver** — Executa a lógica real (opcional).
- **Client** — Configura tudo.

---

## ❌ Problema (Sem o Padrão Command)

```ts
class ControleRemoto {
  ligarLuz() {
    console.log("Luz ligada");
  }

  desligarLuz() {
    console.log("Luz desligada");
  }
}

const controle = new ControleRemoto();
controle.ligarLuz();
controle.desligarLuz();
Esse modelo é rígido e difícil de estender.

✅ Solução Usando o Padrão Command
🔹 1. Interface Command
ts
Copiar código
interface Command {
  execute(): void;
}



🔹 2. Comandos (ConcreteCommand)
ts
Copiar código
class LigarLuz implements Command {
  execute() {
    console.log("Lâmpada ligada");
  }
}

class DesligarLuz implements Command {
  execute() {
    console.log("Lâmpada desligada");
  }
}





🔹 3. Invoker
ts
Copiar código
class ControleRemoto {
  executar(comando: Command) {
    comando.execute();
  }
}
🔹 4. Uso (Client)
ts
Copiar código
const controle = new ControleRemoto();

controle.executar(new LigarLuz());
controle.executar(new DesligarLuz());
💡 Pontos Fortes
Reduz acoplamento entre interface e execução.

Fácil adicionar novos comandos sem alterar código já existente.

Permite histórico, filas e operações de desfazer/refazer.

Estrutura modular e organizada.

⚠ Pontos Fracos
Em ações simples, cria complexidade desnecessária.

Pode gerar muitas classes em sistemas grandes.

🏁 Conclusão
O padrão Command transforma ações em objetos independentes, trazendo flexibilidade, reuso e organização.
É ideal para automação, macros, histórico de ações e sistemas que precisam de comandos desacoplados e expansíveis.

yaml
Copiar código
