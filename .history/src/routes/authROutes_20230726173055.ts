import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { sendEmailToken } from '../services/emailService';

const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;
const AUTHENTICATION_EXPIRATION_HOURS = 12;
const JWT_SECRET = process.env.JWT_SECRET || 'SUPER SECRET';

const router = Router();
const prisma = new PrismaClient();

// Generate a random 8 digit number as the email token
function generateEmailToken(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

function generateAuthToken(tokenId: number): string {
  const jwtPayload = { tokenId };

  return jwt.sign(jwtPayload, JWT_SECRET, {
    algorithm: 'HS256',
    noTimestamp: true,
  });
}

// Create a user, if it doesn't exist,
// generate the emailToken and send it to their email
router.post('/login', async (req, res) => {
  const { email } = req.body;

  // generate token
  const emailToken = generateEmailToken();
  const expiration = new Date(
    new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES * 60 * 1000
  );

  try {
    const createdToken = await prisma.token.create({
      data: {
        type: 'EMAIL',
        emailToken,
        expiration,
        user: {
          connectOrCreate: {
            where: { email },  // Recherche de l'utilisateur par email pour lui envoyer le token 
            create: { email }, // Si l'utilisateur n'existe pas il faut creer l'utilisateur en meme temps que le token
          },
        },
      },
    });

    // console.log(createdToken);
    // TODO send emailToken to user's email
    await sendEmailToken(email, emailToken);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ error: "Couldn't start the authentication process" });
  }
});

// Validate the emailToken
// Generate a long-lived JWT token
router.post('/authenticate', async (req, res) => {
  const { email, emailToken } = req.body;

  const dbEmailToken = await prisma.token.findUnique({
    where: {
      emailToken,
    },
    include: {
      user: true,
    },
  });

  if (!dbEmailToken || !dbEmailToken.valid) {
    return res.sendStatus(401);
  }

  if (dbEmailToken.expiration < new Date()) {
    return res.status(401).json({ error: 'Token expired!' });
  }

  if (dbEmailToken?.user?.email !== email) {
    return res.sendStatus(401);
  }

  // Here we validated that the user is the owner of the email

  // generate an API token
  const expiration = new Date(
    new Date().getTime() + AUTHENTICATION_EXPIRATION_HOURS * 60 * 60 * 1000
  );
  const apiToken = await prisma.token.create({
    data: {
      type: 'API',
      expiration,
      user: {
        connect: {
          email,
        },
      },
    },
  });

  // Invalidate the emailToken lors de l'authentification il y a deux etapes : 1- On envoie une demand par email et on obtient un Emailtoken lors du loginIn  2- Creation par la suite d'un Api token pour l'authentification de l'utilisateur 
  await prisma.token.update({
    where: { id: dbEmailToken.id },
    data: { valid: false },
  });

  // generate the JWT token
  const authToken = generateAuthToken(apiToken.id);

  res.json({ authToken });
});

export default router;


/**
   Authentication flow 
   
   1-login 
   Email ---> Creation d'un emailToken

   2-Authentication 
   email + emailToken ---> Creation d'un authToken(JWT) ---> acceder a l'application 
 */