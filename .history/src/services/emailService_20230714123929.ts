import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { error } from 'console';
require('dotenv').config()

const ses = new SESClient({region: 'us-west-1' });

function createSendEmailCommand(
  toAddress: string,
  fromAddress: string,
  message: string
) {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
    },
    Source: fromAddress,
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: 'Your one-time password',
      },
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: message,
        },
      },
    },
  });
}

export async function sendEmailToken(email: string, token: string) {
  console.log('email: ', email, token);

  const message = `Your one time password: ${token}`;
  const command = createSendEmailCommand(
    email,
    'mlab33972@gmail.com',
    message
  );

  try {
    return await ses.send(command);
  } catch (e) {
    console.log('Error sending email', e);
    return error;
  }
}

/**
 Configuration Amazon SES
 Le service va exporter une fonction qui nous aidera a envoyer l'emailToken a l'email voulu 
 

 CreateSendEmailCommand: fonction qui definit toutes les proprietes de l'email que l'on veut envoyer 


 */