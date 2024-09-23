# Objetivos:
A aula 03 trouxe muitos conceitos novos, vou detalhar cada um deles a seguir:

- Padrão Registry:
- Injeção de dependência:
- Arquitetura hexagonal:
- Entidades:
- Domain Model:
- Repository:
- Padrão Decorator:

# Entidades:
- Ao criar uma nova entidade se usa o método estático de criação. Ao recuperar/mapear uma entidade, se usa o construtor `new`.

# Passos para estruturar o projeto:
1. Deixar os testes rodando
2. Começar a refatorar o código pela criação do Domain Model
3. Criar a interface do Repository de Account
4. Criar a implementação do Repository de Account
5. Temos que criar a camada de frameworks & drivers (infra)