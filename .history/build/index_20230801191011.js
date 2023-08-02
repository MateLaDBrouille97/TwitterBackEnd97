"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const tweetRoutes_1 = __importDefault(require("./routes/tweetRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const authMiddleware_1 = require("./middlewares/authMiddleware");
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Parse the data to Json automaticly
app.use('/user', authMiddleware_1.authenticateToken, userRoutes_1.default); //Ici toutes les routes impliquant les utilisateurs commenceront par "/user"
app.use('/tweet', authMiddleware_1.authenticateToken, tweetRoutes_1.default); //Ici toutes les routes impliquant les tweets commenceront par "/tweet"
app.use('/auth', authRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Hello "updated" world!');
}); // 1ere fonction ou on cherche a obtenir une requete et une reponse 
app.listen(3000, () => {
    console.log('Server ready at localhost:3000');
}); //2eme fonction Comprend le port ou on ecoute et on met un message pour dire que ca fonctionne 
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



 ////// RUN THE SERVER ON EC2

 /**
  * 
  1- Create an instance on EC2 on AWS (Amazone Web Services)

  2- Connect the instance using the terminal 
     -Go to the instance code name 
     -Click Connect 
          -Go to SSh Client 
          -Follow the instructions 
     -In tne TERMINAL (open a new terminal for the following instructions )
          - use the instruction looking like this example : ssh -i C:\Users\Manolo97233\.cache\Documents\Programmation\TwitterKeyPair.pem  ec2-user@ec2-18-206-163-108.compute-1.amazonaws.com
          ===>If the connection is successful you have to see a bird 

          - Go to NVM git repository (Node version Manager) and in the terminal :
                 - use the instruction : curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
                 - If you don't want to restart the terminal for the changes to be effective ==> source ~/.bashrc
                 - Install NVM : nvm install --lts
                 - Install any update using : sudo yum update -y
                 - Install GIT using  : sudo yum install git -y
                 - GIT CLONE YOUR BACKEND REPO 
                 - Go to the repo using cd (name of the repo)
                 - use npm install to install packages
          
          -GO to PM2 for your server to run indefinitely in the back ground.
                 - Install PM2 in the global like the instructions 
                 - pm2 start TwitterBackEnd97/build/index.js ==> here we use pm2 with the path of the back end we want to connect to.

                 If We add some changes in the backend 
                           - 1 Push changes to git repo
                           - 2 npm run build 
                           - 3 pm2 restart (name of instance here index) 


          



  */
