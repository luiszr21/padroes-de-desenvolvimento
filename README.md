
Engenharia de Software II
Categoria: Comportamental
## Trabalho – Padrões de Desenvolvimento - Command / Observer
Integrantes: [Luís Matheus e Vicente Rochefort]



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
