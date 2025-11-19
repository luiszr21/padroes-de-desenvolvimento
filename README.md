Engenharia de Software II
Categoria: Comportamental
## Trabalho – Padrões de Desenvolvimento - Comando / Observador / COLOCA O TEU AQUI
Integrantes: [ Luís Matheus, Vicente Rochefort e João Vítor Goes ]


---

## Objetivo do trabalho

Estudar e demonstrar 3 padrões comportamentais do GoF — ** Command ** , ** Observer ** e ** .... ** — com explicação, exemplos em ** TypeScript ** mostrando * sem padrão * e * com padrão * , análise de pontos fortes/fracos, comparativo entre os padrões.

---

##   Estrutura do

```
padroes-de-desenvolvimento/
├── README.md
├── comando/
│ ├── sem-padrao/
│ │ └── index.ts
│ └── com-padrao/
│ └── index.ts
├── observador/
│ ├── sem-padrao/
│ │ └── index.ts
│ └── com-padrao/
│ └── index.ts
```


# 1. COMANDO

##   Descrição do Comando Padrão

O padrão * Command * tem como propósito encapsular uma requisição (ação) em um objeto. Dessa forma, comportamentos podem ser parametrizados, armazenados, arquivados, desfeitos ou executados posteriormente, separando quem solicita a ação de quem executa.

Ele é útil em cenários onde há necessidade de criar sistemas com histórico de ações, mecanismos de desfazer/refazer, filas de comandos, macros ou quando se deseja reduzir o fechamento entre a interface e a lógica de execução.

---

## Objetivo

- Encapsular conexões em objetos.
- Desacoplar o emissor (invocador) do receptor (receptor).
- Permitir armazenar, arquivar, registrar e desfazer comandos.

---

## Estrutura

1 .  ** Command ** : interface que declara o método ` execute() ` .
2 .  ** ConcreteCommand ** : implementação concreta da ação.
3 .  ** Invoker ** : recebe o comando e aciona.
4 .  ** Receptor ** (opcional): objeto que realiza o trabalho interno.
5 .  ** Cliente ** : configura tudo e escolhe qual comando usar.

---

# Problema: Código sem o Padrão

A seguir, um exemplo simples onde um controle remoto executa ações de forma direta, através de condicionais. Esse formato dificulta a escalabilidade e aumenta o isolamento:

``` ts
//comando/sem-padrao/index.ts​

classe  remoto {
  Luz() {
    console . log ( " Luz ligada " );
  }

  desligarLuz() {
    console . log ( " Luz desligada " );
  }
}

const controle =  new  ControleRemoto ();
controle . ligarLuz ();
controle . desligarLuz ();
```

Nesse modelo, adicionar novas ações exige modificação direta do ControleRemoto, tornando o código rígido e pouco extensível.


# Solução com o Comando Padrão

** Comando de Interface **
``` ts
interface  Command {
  execute() :  void ;
}

// Comandos Concretos
classe  LigarLuz  implementa  Command {
  executar() {
    console . log ( “ Lâmpada ligada ” );
  }
}

classe  ‡rLuz  implementa  Command {
  executar() {
    console . log ( " Lâmpada desligada " );
  }
}
 // Invocador
  Invocador ( Controle  Remoto )
classe  remoto {
  executar( comando :  Comando ) {
    comando . execute ();
  }
}

 // Uso do x
const controle =  new  ControleRemoto ();

controle . executar ( nova  LigarLuz ());
controle . executar ( new  DesligarLuz ());
```



#Estrutura do Padrão (visão geral)

* Comando: * Interface que define a operação a ser realizada.

* ConcreteCommand: * Implementações específicas das ações.

* Invoker: * Objeto que solicita a execução de comandos.

* Receptor (opcional): * Objeto que realiza o trabalho real.

* Cliente: * Configure e associe comandos ao invocador.

# Pontos Fortes

 - Reduza a proteção entre quem solicita e quem executa a ação.

 - Facilita a adição de novos comandos sem alterar o código existente.

 - Permite armazenar comandos em listas, filas ou pilhas.

 - Possibilidade de implementar funcionalidades como desfazer/refazer.

 - Organização clara do código, facilitando manutenção e testes.

# Pontos Fracos

 - Pode gerar um grande número de classes em sistemas complexos.

 - Para comandos muito simples, pode parecer código excessivo.

 - Estrutura elaborada mais complexa quando comparada a chamadas diretas.

# Conclusão

O padrão ** Command ** oferece uma forma robusta e organizada de ações encapsuladas, tornando sistemas mais flexíveis, extensíveis e de baixa segurança. Sua aplicação é especialmente útil em contextos que exigem histórico de operações, automação de tarefas, controles remotos, linhas de execução e ações configuráveis.

Este estudo demonstrou a diferença entre uma melhoria direta e uma estrutura baseada no padrão, evidenciando ganhos consideráveis ​​na modularidade e manutenção.
