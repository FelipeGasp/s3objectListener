const AWS = require('aws-sdk');
const csv = require('csv-parser');
require('dotenv').config();
//Configurando chaves de acesso para manipulação
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN
});


// Configurando a região da AWS usando .config
AWS.config.update({ region: 'us-east-1' });

//Criando um objeto do bucket
const s3 = new AWS.S3();
// const nomeBucket = 'tagtech-client'; Use esta linha caso queira "chumbar" o bucket usado, use processCSV caso queira dinamico

//Função para async para listar objetos usando função .listObjectsV2
const listObjects = async () =>{
  try{
    const data = await s3.listObjectsV2({Bucket:nomeBucket}).promise();
    console.log('Objects in S3 bucket:');
    data.Contents.forEach((obj) => {
      console.log(obj.Key)
    });
  } catch(err){
    console.error('Error acessing buckets:',err)
  }
};

const readFileCsv = async (fileName, nomeBucket) =>{
  return new Promise((resolve, reject) => {
    const results = []; // Vetor para leitura dos dados

    const params = {
        Bucket: nomeBucket, // Aqui é o nome do bucket ou a variavel
        Key: fileName, // Aqui é o nome do arquivo
    };

    const s3Stream = s3.getObject(params).createReadStream();

    s3Stream
        .pipe(csv())
        .on('data', (data) => {
            results.push(data); // Colocando resultados numa array
        })
        .on('end', () => {
            console.log('CSV file processed successfully.');
            resolve(results); // Resolvendo promessa como resultados
        })
        .on('error', (err) => {
            console.error('Error reading CSV:', err);
            reject(err); // Rejeitando promessa
        });
});
  };

  const processCSV = async () => {
    try {
        const nomeBucket = 'tagtech-client';
        const fileName = 'relatorioSemanal.csv'
        var csvData = await readFileCsv(fileName,nomeBucket/*Aqui dentro você passa o argumento do nome do arquivo, se você quiser deixar o código dinâmico, exemplo de uso listado */);
        console.log('Parsed CSV Data:', csvData);
        // Agora você tem o arquivo pronto para uso externo
    } catch (error) {
        console.error('Error processing CSV:', error);
    }
};
//chamando as functions e views

// listObjects();
processCSV();
// readFileCsv();
// Comente qual você não quer se necessário.
///////////////////////////////////////////////
///SEMPRE DEIXA READ FILE DEPOIS DO PROCESS////
///////////////////////////////////////////////
/////////NUNCA CHAME processCSV e readFileCsv ao mesmo tempo, elas chamam uma a outra////////////////