import express from 'express';


const app = express();
app.use(express.json()); //Parse the data to Json automaticly


app.get('/', (req, res) => {
    res.send('Hello "updated" world!');
  }); // 1ere fonction ou on cherche a obtenir une requete et une reponse 

app.listen(3000, () => {
    console.log('Server ready at localhost:3000');
  });  //2em fonction Comprend le port ou on ecoute et on met un message pour dire que ca fonctionne 

