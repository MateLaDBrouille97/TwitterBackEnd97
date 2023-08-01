import express from 'express';


const app = express();
app.use(express.json()); //Parse the data to Json automaticly


app.get('/', (req, res) => {
    res.send('Hello "updated" world!');
  }); // 1ere fonction ou on cherche a obtenir une requete et une reponse 

app.listen(3000, () => {
    console.log('Server ready at localhost:3000');
  });  //2eme fonction Comprend le port ou on ecoute et on met un message pour dire que ca fonctionne 

/*
app.METHOD(PATH,HANDLER)

Ici on utilise .get()=>pour obtenir quelque chose de la base de donnees
               .put()=>pour updater quelque chose 
               .post()=>pour poster quelque chose 
               .delete()=>pour detruire quelque chose 
               .listen()=>pour ecouter a l'adresse quelquechose 

pour PATH:
     si on utilise '/' on veut dire home 

pour HANDLER: 
  C'est une fonction qui recoit la requete qui a ete faite et permet aussi de renvoyer des informations directement aussi 

*/ 