import nodemailer from 'nodemailer';
import 'dotenv/config';

export const sendEmail = async (email: string, url: string) => {
  console.log(process.env.EMAIL_PWD);
  const transporter = nodemailer.createTransport({
    host: 'smtp.outlook.com',
    auth: {
      user: 'milan.varnamo@outlook.com',
      pass: process.env.EMAIL_PWD,
    },
  });

  const options = {
    from: 'milan.varnamo@outlook.com',
    to: email,
    subject: 'PhotoDiary || Confirm your account',
    text: 'Confirm your account by clicking the link below.',
    html: `<a href="${url}">${url}</a>`,
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
    }
    console.log(info);
  });
};
