import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

//User CRUD

//Create User
router.post('/',(req, res) => {
    res.status(501).json({
        error:"Not Implemented"
    })
})

//Get a list of Users
router.get('/',async(req, res) => {
    const allUser = await prisma.user.findMany({
        // select: {
        //   id: true,
        //   name: true,
        //   image: true,
        //   bio: true,
        // },
      });
      res.json(allUser);
   })


//get 1 user
router.get('/:id',(req, res) => {

    const {id}= req.params;

    res.status(501).json({
        error:`Not Implemented:${id}`
    })
   })

//Update User
router.put('/:id',(req, res) => {

    const {id}= req.params;

    res.status(501).json({
        error:`Not Implemented:${id}`
    })
   })

//Delete User

router.delete('/:id',(req, res) => {

    const {id}= req.params;

    res.status(501).json({
        error:`Not Implemented:${id}`
    })
   })






export default router;

/*

Pour creer un router :  

   import { Router } from 'express';
   const router = Router();



router.METHOD(PATH,HANDLER)

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