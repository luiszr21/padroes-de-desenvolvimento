
Engenharia de Software II
Categoria: Comportamental
## Trabalho – Padrões de Desenvolvimento - Command / Observer / COLOCA O TEU AQUI
Integrantes: [Luís Matheus, Vicente Rochefort e João Vítor Goes]


---

## Objetivo do trabalho

Estudar e demonstrar 3 padrões comportamentais do GoF — **Command**, **Observer** e **....** — com explicações, exemplos em **TypeScript** mostrando *sem padrão* e *com padrão*, análise de pontos fortes/fracos, comparativo entre os padrões.

---

##  Estrutura do repositório

```
padroes-de-desenvolvimento/
├── README.md
├── command/
│   ├── sem-padrao/
│   │   └── index.ts
│   └── com-padrao/
│       └── index.ts
├── observer/
│   ├── sem-padrao/
│   │   └── index.ts
│   └── com-padrao/
│       └── index.ts
```


# 1. COMMAND

##  Descrição do Padrão Command

O padrão *Command* tem como propósito encapsular uma requisição (ação) em um objeto. Dessa forma, comportamentos podem ser parametrizados, armazenados, enfileirados, desfeitos ou executados posteriormente, separando quem solicita a ação de quem executa.

Ele é útil em cenários onde há necessidade de criar sistemas com histórico de ações, mecanismos de desfazer/refazer, filas de comandos, macros ou quando se deseja reduzir o acoplamento entre a interface e a lógica de execução.

---

## Objetivo

- Encapsular solicitações em objetos.
- Desacoplar o emissor (invoker) do receptor (receiver).
- Permitir armazenar, enfileirar, registrar e desfazer comandos.

---

## Estrutura

1. **Command**: interface que declara o método `execute()`.
2. **ConcreteCommand**: implementação concreta da ação.
3. **Invoker**: recebe o comando e o aciona.
4. **Receiver** (opcional): objeto que realiza o trabalho interno.
5. **Client**: configura tudo e escolhe qual comando utilizar.

---

# Problema: Código sem o Padrão

A seguir, um exemplo simples onde um controle remoto executa ações de forma direta, através de condicionais. Esse formato dificulta a escalabilidade e aumenta o acoplamento:

```ts
// command/sem-padrao/index.ts

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
```

Nesse modelo, adicionar novas ações exige modificar diretamente o ControleRemoto, tornando o código rígido e pouco extensível.


# Solução com o Padrão Command

**Interface Command**
```ts
interface Command {
  execute(): void;
}

// Comandos Concretos
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
 // Invoker
  Invocador (Controle Remoto)
class ControleRemoto {
  executar(comando: Command) {
    comando.execute();
  }
}

 // Uso do Padrão
const controle = new ControleRemoto();

controle.executar(new LigarLuz());
controle.executar(new DesligarLuz());
```



# Estrutura do Padrão (visão geral)

*Command:* Interface que define a operação a ser executada.

*ConcreteCommand:* Implementações específicas das ações.

*Invoker:* Objeto que solicita a execução dos comandos.

*Receiver (opcional):* Objeto que realiza o trabalho real.

*Client:* Configura e associa comandos ao invocador.

# Pontos Fortes

 - Reduz o acoplamento entre quem solicita e quem executa a ação.

 - Facilita a adição de novos comandos sem alterar o código existente.

 - Permite armazenar comandos em listas, filas ou pilhas.

 - Possibilita a implementação de funcionalidades como desfazer/refazer.

 - Organização clara do código, facilitando manutenção e testes.

# Pontos Fracos

 - Pode gerar grande número de classes em sistemas complexos.

 - Para comandos muito simples, pode parecer código excessivo.

 - Estrutura ligeiramente mais complexa quando comparada a chamadas diretas.

# Conclusão

O padrão **Command** oferece uma forma robusta e organizada de encapsular ações, tornando sistemas mais flexíveis, extensíveis e de baixo acoplamento. Sua aplicação é especialmente útil em contextos que requerem histórico de operações, automação de tarefas, controles remotos, filas de execução e ações configuráveis.

Este estudo demonstrou a diferença entre uma implementação direta e uma estrutura baseada no padrão, evidenciando ganhos consideráveis na modularidade e manutenção.
