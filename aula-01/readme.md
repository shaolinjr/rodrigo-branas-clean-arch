Utilizando as técnicas de refactoring que vimos na aula, refatore o código do UC1 - Signup, disponível em:



https://github.com/rodrigobranas/cccat18_1/blob/master/src/signup.ts



UC1 - Signup

Ator: Passageiro, Motorista

Input: name, email, cpf, carPlate, password, isPassenger, isDriver

Output: account_id



* deve verificar se o email já existe e lançar um erro caso já exista

* deve gerar o account_id (uuid)

* deve validar o nome, email e cpf

* deve apenas salvar a senha, por enquanto em claro



Para testar adequadamente o UC1 será necessário criar o UC2 - GetAccount.



UC2 - GetAccount

Input: account_id

Output: todas as informações da conta



Observações:



* O objetivo é refatorar o código utilizando as técnicas de refactoring vistas na aula 1 como renomear variável, extrair método, simplificar condicional, tratar exceções adequadamente, remover comentários, entre outras. Não se preocupe com o design e a arquitetura por enquanto, separe as responsabilidades seguindo o que você acredita ser o que faz mais sentido pra você. Na aula 2 vamos abordar o design de acordo com a Arquitetura Hexagonal.

* Faça testes tanto na API quanto nas regras de negócio

* Utilize o Docker para subir o banco de dados por meio do comando "yarn docker:start" ou utilize uma instalação local, aplicando o script create.sql



Para utilizar o Docker recomendo instalar o Docker Desktop, que está disponível em:



https://www.docker.com/products/docker-desktop