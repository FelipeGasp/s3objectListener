
# Projeto de Automação com AWS S3 e JavaScript

Este projeto tem como objetivo conectar uma automação leve a um bucket S3 utilizando JavaScript, para posterior interação com **Web Data Visualization**.

## Passos para configurar o projeto

### 1. Clonar o repositório

Comece clonando o repositório para a sua máquina local. No terminal, execute:

```bash
git clone <URL-do-repositorio>
```

Substitua `<URL-do-repositorio>` pela seguinte URL: `https://github.com/FelipeGasp/s3objectListener.git`

### 2. Configurar variáveis de ambiente

Após clonar o repositório, você precisa configurar as variáveis de ambiente para se conectar ao S3 da AWS.

1. Crie um arquivo `.env` na raiz do projeto.
2. No terminal, utilize o comando abaixo para visualizar suas credenciais da AWS:
   ```bash
   cat ~/.aws/credentials
   ```
3. Copie as informações exibidas e cole no seu arquivo `.env` da seguinte forma:

```plaintext
AWS_ACCESS_KEY_ID="seuAccessKeyId"
AWS_SECRET_ACCESS_KEY="seuSecretAccessKey"
AWS_SESSION_TOKEN="tokenDeAcesso"
```

Se você não sabe como configurar o `.env`, consulte a [documentação do dotenv](https://www.npmjs.com/package/dotenv).

Configure também dentro do arquivo a região de sua AWS:
```plaintext
AWS.config.update({ region: 'regiaoInformadoNoConsole' });
```
### 3. Instalar dependências

Navegue até o diretório do projeto e execute o comando abaixo para instalar as dependências necessárias:

```bash
npm install
```

### 4. Executar o projeto

Depois de instalar as dependências, você pode rodar o projeto usando o seguinte comando:

```bash
node teste.js
```

Esse comando substituirá o tradicional `npm start`.

### Dica: Tratando erros

Se você encontrar algum erro relacionado aos parâmetros do bucket ou do arquivo, verifique o nome dos parâmetros que está passando para as funções. Certifique-se de que o nome do bucket e do arquivo estejam corretos.

Caso tenha algum erro de conexão, ajuste o nome dos parâmetros ou o conteúdo do arquivo `.env` para refletir as configurações corretas de sua AWS.

---

# Integração com web-data-viz

### 1. Clone os dois projetos:

```bash
git clone <URLs3ObjectListener> && git clone <URLdoProjeto>
```

### 2. Mova codigo teste.js para a pasta routes do web-data-viz:

Isto ira importar o teste.js para o backend do web-data-viz

### 3. Configure APP.JS
 Cole estes dois no app.js:
```bash
var AWS = require('aws-sdk');
var csv = require('csv-parser');
```
 Crie a rota debaixo das outras(não precisa estar com o mesmo nome que o meu):
```bash
var getS3Objects = require('./src/routes/objectLister.js')
```
### 4. Configurando teste.js
Lembre-se de no final do código feito no passo 2, colocar module.exports = (functions que desejar consumir)
```bash
module.exports = callObjectsListing;
module.exports = processCSV;
```
### 5. Crie o consumo
Para finalizar, deixe o wdv aberto para ser consumido com o seguinte código:

```bash
app.get("/viewS3", async(req, res) =>{
    try {
        const resultado = await getS3Objects();
        res.json( {resultado});
    } catch (error) {
        res.status(500).json({error: 'Erro interno do servidor'})
    }
 })
```


Agora você está pronto para conectar à AWS S3 e começar a interagir com seus dados via JavaScript de forma eficiente!
