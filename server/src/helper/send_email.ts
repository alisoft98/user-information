import EmailProvider from "../config/email";
import { CreateUser, User } from "../types/user";
const { APP_NAME } = process.env;
import path from "path";
import ResponseError from "../modules/error/response_error";
import { readHTMLFile } from "./file";
import handlebars from "handlebars";

class SendEmail {
  public static AccountRegister(formData: CreateUser) {
    const { email } = formData;
    const TOKEN = formData.verify_code;
    const pathTemplate = path.resolve(
      __dirname,
      `../public/template/email/emailverify.html`
    );

    const subject = "Alisoft98";
    // const urlToken = `${BASE_URL_CLIENT}/email/verify?token=${token}`
    const dataTemplate = { APP_NAME, TOKEN };
    const Email = new EmailProvider();

    readHTMLFile(pathTemplate, (error: Error, html: any) => {
      if (error) {
        throw new ResponseError.NotFound("email template not found");
      }

      const template = handlebars.compile(html);
      const htmlToSend = template(dataTemplate);

      Email.send(email, subject, htmlToSend);
    });
  }

  // public static forgetPassToken(formData: User, token: string) {
  //   const { email } = formData;
  //   const TOKEN = token;
  //   const pathTemplate = path.resolve(
  //     __dirname,
  //     `../public/template/email/emailverify.html`
  //   );

  //   const subject = "Alishopeee Registeration";
  //   // const urlToken = `${BASE_URL_CLIENT}/email/verify?token=${token}`
  //   const dataTemplate = { APP_NAME, TOKEN };
  //   const Email = new EmailProvider();

  //   readHTMLFile(pathTemplate, (error: Error, html: any) => {
  //     if (error) {
  //       throw new ResponseError.NotFound("email template not found");
  //     }

  //     const template = handlebars.compile(html);
  //     const htmlToSend = template(dataTemplate);
  //     Email.send(email, subject, htmlToSend);
  //   });
  // }
}
export default SendEmail;
