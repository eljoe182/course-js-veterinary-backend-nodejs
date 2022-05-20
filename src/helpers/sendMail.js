import { transport } from "../config/email.js";

export const mailSignUp = async (data) => {
  const { name, email, token } = data;

  await transport().sendMail({
    from: "avp@avp.com",
    to: email,
    subject: "Confirm your account",
    html: `
      <h1>Hi! ${name}, welcome to AVP</h1>
      <p>
        Please click on the link below to confirm your account
      </p>
      <a href="${process.env.CLIENT_URL}/confirm/${token}">Confirm Account</a>
    `,
  });
};

export const mailForgotPassword = async (data) => {
  const { name, email, token } = data;

  await transport().sendMail({
    from: "avp@avp.com",
    to: email,
    subject: "Reset your password",
    html: `
      <h1>Hi! ${name}, you have requested reset your password</h1>
      <p>
        Please click on the link below to reset your password
      </p>
      <a href="${process.env.CLIENT_URL}/reset-password/${token}">Reset password</a>
    `,
  });
};
