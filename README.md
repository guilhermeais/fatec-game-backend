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
A arquitetura da aplicação foi desenvolvida aplicando alguns principios SOLID, com o intuito de ser desacoplada, fácil de testar e fácil de mudar.

**Camadas**:
![image](https://user-images.githubusercontent.com/73388069/192162291-e48ab794-31fc-477b-8aa3-ceb1d3d7d9a9.png)

> # Features
<h3  align="center">🚧Em breve...🚧 </h3>
