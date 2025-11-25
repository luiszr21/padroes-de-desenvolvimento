
Engenharia de Software II
Categoria: Comportamental
## Trabalho – Padrões de Desenvolvimento - Command / Observer / Template Method
Integrantes: [Luís Matheus, Vicente Rochefort e João Vítor Goes]



##  Estrutura do repositório

```
padroes-de-desenvolvimento/
├── README.md
├── command/
│   ├── sem-padrao/
│   └── com-padrao.ts
│
├── observer/
│   ├── sem_padrao.ts
│   └── com_padrao.ts
├── template_method/
│   ├── sem_padrao.ts
│   └── com_padrao.ts
```


# Padrão de Projeto: Command

## Resumo Técnico

O padrão Command encapsula uma ação dentro de um objeto, permitindo que operações sejam tratadas como entidades independentes. Essa abordagem separa quem solicita a ação (Invoker) de quem executa (Receiver), promovendo flexibilidade, organização e baixo acoplamento. É especialmente útil em sistemas que precisam registrar, desfazer/refazer ações, montar filas de comandos ou executar operações futuramente.

## Objetivo

- Encapsular requisições em objetos.
- Reduzir o acoplamento entre interface e lógica.
- Permitir armazenar, enfileirar, registrar e desfazer comandos.

## Estrutura Geral

- **Command**: Interface com o método `execute()`.
- **ConcreteCommand**: Implementa ações específicas.
- **Invoker**: Solicita a execução de um comando.
- **Receiver** (opcional): Executa o comportamento real.
- **Client**: Configura a utilização dos comandos.

## Problema (Sem o Padrão)

```typescript
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

Esse modelo torna a classe rígida e difícil de estender, pois novas ações exigem modificar o código existente.

## Solução com o Padrão Command

### Interface

```typescript
interface Command {
  execute(): void;
}
```

### Comandos

```typescript
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
```

### Invoker

```typescript
class ControleRemoto {
  executar(comando: Command) {
    comando.execute();
  }
}
```

### Uso

```typescript
const controle = new ControleRemoto();
controle.executar(new LigarLuz());
controle.executar(new DesligarLuz());
```

## Pontos Fortes

- ✅ Reduz acoplamento entre interface e execução.
- ✅ Facilita adicionar novos comandos sem alterar códigos já existentes.
- ✅ Permite histórico, filas e desfazer/refazer comandos.
- ✅ Estrutura clara, modular e de fácil manutenção.

## Pontos Fracos

- ⚠️ Pode gerar muitas classes em sistemas grandes.

  
- ⚠️ Para ações simples, pode adicionar complexidade desnecessária.

## Conclusão

O padrão Command torna o código mais flexível e escalável ao transformar ações em objetos independentes. É ideal para cenários que exigem controle refinado de operações, como automação, macros, históricos ou filas de execução, oferecendo vantagens significativas em relação a modelos rígidos e acoplados.
Este estudo demonstrou a diferença entre uma implementação direta e uma estrutura baseada no padrão, evidenciando ganhos consideráveis na modularidade e manutenção.


# 2. Padrão de Projeto: Observer

## 📘 Descrição do Padrão Observer
O padrão **Observer** permite que um objeto principal (*Subject*) notifique automaticamente vários observadores sempre que seu estado muda.  
Ele é usado quando diferentes partes do sistema precisam reagir às mesmas mudanças de forma desacoplada.

---

## 🎯 Objetivo
- Notificar múltiplos objetos automaticamente quando algo muda.  
- Reduzir acoplamento entre quem gera eventos e quem reage.  
- Facilitar atualizações dinâmicas e comunicação baseada em eventos.

---

## ❌ Problema sem o Padrão
Sem o Observer, o objeto precisa chamar manualmente cada componente dependente, criando forte acoplamento.  
Cada novo elemento que precisa ser atualizado obriga a modificar o código principal, deixando o sistema rígido e difícil de manter.

---

## ✅ Solução com o Padrão Observer
O Subject passa a manter uma lista de observadores inscritos.  
Quando seu estado muda, ele chama `notify()`, e todos os observadores recebem a atualização automaticamente por meio do método `update()`.  
Isso torna o sistema flexível e permite adicionar ou remover observadores sem alterar o código existente.

---

## ⭐ Pontos Fortes
- Reduz acoplamento.  
- Observadores podem ser adicionados ou removidos facilmente.  
- Facilita implementação de notificações e eventos.  
- Torna o sistema modular e escalável.

---

## ⚠ Pontos Fracos
- Pode gerar notificações difíceis de rastrear.  
- Com muitos observadores, pode afetar desempenho.  
- Pode causar loops se observadores alterarem o Subject novamente.

---

## Exemplo com o Padrão Observer

```ts
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
```
## Exemplo sem o Padrão Observer

```ts
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
```

## 🏁 Conclusão
O padrão **Observer** é ideal para cenários onde várias partes do sistema precisam reagir a uma mesma mudança sem dependência direta.  
Simples, escalável e amplamente usado em interfaces gráficas, eventos, jogos e sistemas reativos.

# 3. Padrão de Projeto: Template Method
# 📘 Descrição do Padrão Template Method

O padrão Template Method define o esqueleto de um algoritmo em uma classe base, permitindo que subclasses implementem apenas partes específicas do processo.
Assim, a estrutura geral permanece igual, mas detalhes podem mudar conforme a necessidade.

É usado quando vários algoritmos compartilham passos em comum, mas diferem em algumas etapas específicas.

# 🎯 Objetivo

Definir o fluxo geral de um algoritmo em uma classe abstrata.

Permitir que subclasses implementem etapas específicas.

Evitar duplicação de código.

Garantir uma ordem fixa de execução.

# 🏗 Estrutura Geral

Classe Abstrata (Template) → contém o método template() que define a ordem do algoritmo.

Métodos abstratos → devem ser implementados pelas subclasses.

Métodos concretos → partes comuns do algoritmo.

Subclasses → personalizam apenas o que muda.

❌ Problema (Sem o Padrão Template Method)

Cada tipo de pedido possui sua própria lógica duplicada, deixando o sistema:

Rígido

Cheio de repetição de código

Difícil de manter caso algo comum mude

# 🔹 Código sem o padrão:
```
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
```

➡ Aqui, cada classe tem seu próprio fluxo completo: muita duplicação.

# ✅ Solução Usando o Padrão Template Method

Criamos uma classe abstrata com o método processar(), que define:

Validar pagamento

Entregar pedido

Finalizar (passo comum)

As subclasses implementam só o que muda.

# 🔹 Código com o padrão:
```
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

```

# ⭐ Pontos Fortes

Evita repetição de código.

Mantém o processo organizado e padronizado.

Permite variar partes do algoritmo sem alterar sua estrutura.

Aumenta a extensibilidade.

# ⚠ Pontos Fracos

Pode gerar dependência forte entre subclasses e a classe abstrata.

Mudanças na estrutura exigem alterar a classe base.

Subclasses podem ter pouca liberdade dependendo do template.

# 🏁 Conclusão

O padrão Template Method é ideal para algoritmos que possuem a mesma estrutura, mas precisam de variação em etapas específicas.
Ele melhora organização, evita duplicações e permite evolução mais fácil do sistema, tornando o código mais limpo, modular e escalável.
