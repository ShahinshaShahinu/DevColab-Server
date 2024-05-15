import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import juice from 'juice';



console.log(process.env.MAILER_PASS);

const transporter = nodemailer.createTransport({
  
  service: "Gmail",
  auth: {
    user: 'shahinshamsb79@gmail.com',
    pass:'szcj xeec grer gcfp'
  }},
  {from: 'DevColab'}
  
  );
  




export const EmailOtpSend = async (email: string) => {


  try {
    const htmlContent = fs.readFileSync(path.resolve(__dirname, './EmailOtp.html'), 'utf8');
    const cssContent = fs.readFileSync(path.resolve(__dirname, './stylesheet.css'), 'utf8');

   const verificationToken=process.env.EMAIL_VERIFICATION_CODE

    const verificationLink = `${process.env.BASE_URL_ORIGIN}/VerifyEmail`;

    const replacedHtmlContent = htmlContent.replace('${verificationLink}', verificationLink);

const inlinedHtml = juice(`<style>${cssContent}</style>${replacedHtmlContent}`);


    const info = await transporter.sendMail({
        from: {
            name: 'DevColab',
            address: 'mshahinshamsb79@gmail.com'
        },
      to: email,
      subject: 'Verify Your Email',
      text: 'Email Verify ',
      html: inlinedHtml,
    });



    console.log('Message sent: %s', info.messageId);
    return verificationToken;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
};








