"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
//User CRUD
//Create User
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, username } = req.body;
    console.log(email, name, username);
    try {
        const result = yield prisma.user.create({
            data: {
                email,
                name,
                username,
                bio: "Hello, I'm new on Twitter",
            },
        });
        res.json(result);
    }
    catch (e) {
        res.status(400).json({ error: 'Username and email should be unique' });
    }
}));
//Get a list of Users
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUser = yield prisma.user.findMany({
    // select: {
    //   id: true,
    //   name: true,
    //   image: true,
    //   bio: true,
    // },
    });
    res.json(allUser);
}));
//get 1 user
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield prisma.user.findUnique({
        where: { id: Number(id) },
        include: { tweets: true },
    });
    res.json(user);
}));
//Update User
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { bio, name, image } = req.body;
    try {
        const result = yield prisma.user.update({
            where: { id: Number(id) },
            data: { bio, name, image },
        });
        res.json(result);
    }
    catch (e) {
        res.status(400).json({ error: `Failed to update the user` });
    }
}));
//Delete User
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.user.delete({ where: { id: Number(id) } });
    res.sendStatus(200);
}));
exports.default = router;
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
