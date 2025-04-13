import nodemailer from 'nodemailer';
import { GMAIL_PASS, GMAIL_USER, FRONTEND_URL } from './config/index.js';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

export const sendResetLink = async (user, token) => {
  const resetUrl = `${FRONTEND_URL}/reset-password/${token}`;

  try {
    const info = await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <p>Hello ${user.name || ''},</p>
        <p>You requested a password reset.</p>
        <p>Click the link below to set a new password:</p>
        <a href="${resetUrl}" target="_blank">${resetUrl}</a>
        <p>If you did not request this, you can ignore this email.</p>
      `,
    });

    console.log('Password reset email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};
