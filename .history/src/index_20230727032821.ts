import express from 'express';
import userRoutes from "../src/routes/userRoutes";
import tweetRoutes from "../src/routes/tweetRoutes";
import authRoutes from "../src/routes/authRoutes";
import { authenticateToken } from '../src/middlewares/authMiddleware';

const app = express();
app.use(express.json()); // Parse the data to Json automaticly
app.use('/user',authenticateToken,userRoutes) //Ici toutes les routes impliquant les utilisateurs commenceront par "/user"
app.use('/tweet',authenticateToken,tweetRoutes) //Ici toutes les routes impliquant les tweets commenceront par "/tweet"
app.use('/auth',authRoutes) 

app.get('/', (req, res) => {
    res.send('Hello "updated" world!');
  }); // 1ere fonction ou on cherche a obtenir une requete et une reponse 

app.listen(3000, () => {
    console.log('Server ready at localhost:3000');
  });  //2eme fonction Comprend le port ou on ecoute et on met un message pour dire que ca fonctionne 


/**
 creation D'un back end 

 Pour initialiser le projet 

      npm init -y

 1- Installation de Express
  
      npm install express

 2-Installation des dependances 

      npm install typescript ts-node  @types/node @types/express nodemon --save -dev

 */



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

/**
 Pour pouvoir passer en production on a besoin d'avoir des elements typescript 
 Pour activer typescript on va installer :     npx tsc --init

 Dans tsconfig.json:

 Rechercher outDir et le mettre en accessible et ajouter '/build' 

 Package.json :

 Ajouter  "build":"tsc"

 
 */