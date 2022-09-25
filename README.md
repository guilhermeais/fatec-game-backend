# fatec-game-backend 🚀
<a href="https://render.com/deploy?repo=https://github.com/guilhermeais/fatec-game-backend">
  <img src="https://render.com/images/deploy-to-render-button.svg" alt="Deploy to Render">
</a>

Uma **API REST** com **TDD**, **Clean Architecture**, **DDD** e **SOLID** criada por demanda de um trabalho da faculdade (FATEC Franca).

__Eu fiz questão de utilizar bastante engenharia que aprendi nos ultimos meses, já que queria por esses conhecimentos em prática  😅.__

Basicamente, criamos um jogo utilizando a plataforma [**Construct3**](construct.net/), para jogar, é só <a target="_blank" href="https://fatec-game-game.netlify.app/" >clicar aqui</a>.

É um jogo top-down, bem simples... 

Ele faz algumas requisições para o **Firebase** e lá salva os scores dos jogadores, sendo assim, o objetivo dessa API é não só puxar esses dados, mas também, gerencia-los de uma maneira melhor, para que possamos criar um front-end encima dessa API e exibir uma dashboard com as informações dos jogadores, onde inicialmente, será apenas o nome e o score dele.

> # Como rodar
### Testes 🔥
A aplicação utiliza o **vitest** como test runner e possui camadas de testes unitários e testes de integração separados, os testes unitários contém `.test` e os de integração possuí `.spec`. 

Os comandos repsonsáveis por rodarem os testes são:
- `npm run test:unit`: Roda os testes unitários.
- `npm run test:integration`: Roda os testes de integração  
  **ATENÇÃO**: Para rodar os testes de integração, é utilizado o **firebase-emulator**, já que um dos repositórios precisa do firebase para funcionar. Logo, para um teste mais real, o **firebase database é emulado em um container docker**, sendo assim, **para conseguir rodar os testes de integração é necessário ter o ´docker compose` instalado na máquina**.
- `npm run test:coverage`: Roda todos os testes e gera um relatório de cobertura de testes no final.

### Aplicação 🚀
- `npm run start:docker`: Roda a aplicação utilizando o container docker (necessário ter o docker compose para funcionar);
- `npm run start`: Roda a aplicação com **nodemon**;
- `npm run debug`: Roda a aplicação e abre um socket na porta 9222, onde é possível debugar ela utilizando o debugger do VsCode.

> # Documentação
### Arquitetura 🏗️
A arquitetura foi desenvolvida baseada no Clean Architecture, utilizando alguns principios SOLID com o objetivo da aplicação ser desacoplada, fácil de testar e fácil de mudar...

![architecture-diagram](https://user-images.githubusercontent.com/73388069/192162471-9b337daa-0ce4-4f4f-a1ec-47a9fb719b6d.png)

**Camadas**:
- **Domain**:
  Camada onde se encontra os **casos de usos** da aplicação, essa camada é a camada mais protegida da nossa aplicação, já que ela representa nossas regras de negócios e tudo mais... Logo, o ideal é que ela não dependa de nenhuma outra camada.
![image](https://user-images.githubusercontent.com/73388069/192162576-e36d4538-9897-4356-ac04-5b6f07095675.png)

- **Infra**: 
  Nela temos a implementação de dependencias do caso de uso, como os **repositories**, no exemplo, nós criamos a `GetPlayersScoreRepositoryFirebase`, onde ele implementa o repositório utilizando o Firebase. Poderiamos fazer o mesmo repositório utilizando MySQL, por exemplo... 

 ![image](https://user-images.githubusercontent.com/73388069/192162675-dcd09ab8-0c99-4415-ade0-bdd3c0ee0eea.png)

- **Presentation**: 
  Nessa camada fica tudo o que vamos apresentar para o nosso cliente. Nossos **controllers**, por exemplo, ficam aqui, já que eles serão os responsáveis por passar os dados de outras camadas para o cliente final. Temos um exemplo de controller, a **GetPlaeyrsScoreController**, ela tem dependencia do nosso caso de uso **GetPlayersScore** e utiliza ele para aprensentar ao usuário final. 
  
  A camada de **presentation** segue um padrão para criar as **controllers**, de modo que quando formos compor a aplicação (na pasta **main**), nós possamos adaptar esse padrão para alguma lib externa (como o express ou graphql).
  
  ![image](https://user-images.githubusercontent.com/73388069/192162854-5be18d7f-f1cc-4b99-9ec0-4e59154d5d78.png)



> # Features
<h3  align="center">🚧Em breve...🚧 </h3>
