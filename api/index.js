const express = require('express');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
require('dotenv').config();

// const serviceAccount = require('../myshop-1580d-firebase-adminsdk-fbsvc-69296d705b.json');

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Important: handle newlines
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(bodyParser.json());

// ตั้งค่า SMTP (ใช้ Gmail) - ใช้ environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// API ส่งอีเมลยืนยัน
app.post('/send-custom-verification-email', async (req, res) => {
  const { userEmail, redirectUrl } = req.body;
  const actionCodeSettings = {
    url: redirectUrl || `${process.env.FRONTEND_URL}/verify-email-success`
  };

  try {
    // สร้างลิงก์ยืนยัน
    const actionLink = await admin.auth().generateEmailVerificationLink(userEmail, actionCodeSettings);

    // สร้างเนื้อหาอีเมล custom
    const html = `
      <h2>ยืนยันอีเมลสำหรับ Art-tive</h2>
      <p>สวัสดีค่ะ/ครับ,</p>
      <p>กรุณาคลิกลิงก์ด้านล่างเพื่อยืนยันอีเมลของคุณ:</p>
      <a href="${actionLink}">ยืนยันอีเมล</a>
      <p>หากคุณไม่ได้สมัครสมาชิก กรุณาเมินอีเมลนี้</p>
      <br>
      <p>ขอบคุณ,<br>ทีมงาน Art-tive</p>
    `;

    // ส่งอีเมล
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: userEmail,
      subject: process.env.EMAIL_SUBJECT,
      html
    });

    res.status(200).json({ message: 'ส่งอีเมลยืนยันแล้ว' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ error: err.message });
  }
});

// ... (โค้ดเดิม)

module.exports = app;
module.exports.handler = serverless(app); 