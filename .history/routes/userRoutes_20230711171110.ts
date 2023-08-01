import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

//User CRUD

//Create User
router.post('/',async(req, res) => {
    const { email, name, username } = req.body;
    console.log(email, name, username)
    try {
    const result = await prisma.user.create({
      data: {
        email,
        name,
        username,
        bio: "Hello, I'm new on Twitter",
      },
    });

    res.json(result);
  } catch (e) {
    res.status(400).json({ error: 'Username and email should be unique' });
  }
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
router.get('/:id',async(req, res) => {

    const {id}= req.params;

    const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: { tweets: true },
      });
    
      res.json(user);
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



/**
 * 
 Si on veut ajouter 
 */