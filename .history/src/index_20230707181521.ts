import express from 'express';
import userRoutes from "../routes/userRoutes";
import tweetRoutes from "../routes/tweetRoutes"

const app = express();
app.use(express.json()); //Parse the data to Json automaticly
app.use('/user',userRoutes) //Ici on dit que pour toutes les routes impliquant utilisateurs commence par "/user"
app.use('/tweet',tweetRoutes) 

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


Pour garder de la consistance dans la facon d'ecrire le code et pour ne pas surcharger un fichier il est important de garder les elements pour le user ensemble et les elements pour les tweets ensemble etc..
==> On va donc creer un fichier appele routes 
             
*/ 