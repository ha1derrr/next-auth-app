import nodemailer from "nodemailer";
import { emailTypes } from "../../constants/emailTypes";
import bcrypt from "bcrypt";
import User from "../../app/models/user.model";

const sendMail = async ({ to, userId, emailType }) => {
  try {
    const hashedToken = await bcrypt.hash(userId, 10);
    if (emailType === emailTypes.VERIFY) {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === emailTypes.RESET) {
      await User.findByIdAndUpdate(userId, {
        resetPasswordToken: hashedToken,
        resetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_ID,
      to,
      subject:
        emailType === "verify" ? "Verify your mail" : "Reset your password",
      html: `<p>Click here ${process.env.DOMAIN}/verify?token=${hashedToken} 
      to ${
        emailType === "verify" ? "verify your email" : "reset your password"
      } `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log(info);
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default sendMail;
