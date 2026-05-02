const nodemailer = require('nodemailer');

// Brevo SMTP transporter using the xsmtpsib- key
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: 'a53b64001@smtp-brevo.com',
    pass: process.env.BREVO_API_KEY,
  },
});

const FROM_EMAIL = 'srr0607378@gmail.com';
const FROM_NAME = 'RoiScholar';

/**
 * Send a confirmation email for a submitted loan application
 * @param {string} to - Recipient email
 * @param {string} name - Recipient name
 * @param {string} university - University applied for
 */
exports.sendApplicationConfirmation = async (to, name, university) => {
  try {
    const info = await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to,
      subject: 'Application Received - RoiScholar',
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 32px; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 24px; border-radius: 8px; text-align: center; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">RoiScholar</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0;">STEM Education Financing</p>
          </div>
          <h2 style="color: #1e293b;">Hello, ${name}!</h2>
          <p style="color: #475569; line-height: 1.6;">
            Great news - we've successfully received your loan application for 
            <strong style="color: #6366f1;">${university}</strong>.
          </p>
          <div style="background: white; border-left: 4px solid #6366f1; padding: 16px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0; color: #475569;"><strong>What happens next?</strong><br/>
            Our team is reviewing your application. You can track your status in real-time on your dashboard.</p>
          </div>
          <p style="color: #94a3b8; font-size: 14px; margin-top: 32px;">
            Best regards,<br/><strong>The RoiScholar Team</strong>
          </p>
        </div>
      `,
    });

    console.log('Email sent successfully:', info.messageId);
    return { success: true, data: info };
  } catch (err) {
    console.error('Email Send Error:', err.message);
    return { success: false, error: err.message };
  }
};

/**
 * Send a welcome email to a newly registered user
 */
exports.sendWelcomeEmail = async (to, name) => {
  try {
    const info = await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to,
      subject: 'Welcome to RoiScholar!',
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 32px; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 24px; border-radius: 8px; text-align: center; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">RoiScholar</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0;">STEM Education Financing</p>
          </div>
          <h2 style="color: #1e293b;">Welcome, ${name}!</h2>
          <p style="color: #475569; line-height: 1.6;">
            You've joined a platform built to give STEM students total clarity over their education investment.
          </p>
          <div style="background: white; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-weight: 600; color: #1e293b; margin-bottom: 12px;">Here's what you can do:</p>
            <p style="margin: 4px 0; color: #475569;">Loan Calculator - Simulate your exact EMI</p>
            <p style="margin: 4px 0; color: #475569;">ROI Simulator - Predict your salary growth</p>
            <p style="margin: 4px 0; color: #475569;">Scholarship Finder - Find funding matched to you</p>
          </div>
          <p style="color: #94a3b8; font-size: 14px; margin-top: 32px;">
            Best regards,<br/><strong>The RoiScholar Team</strong>
          </p>
        </div>
      `,
    });

    console.log('Welcome email sent:', info.messageId);
    return { success: true, data: info };
  } catch (err) {
    console.error('Welcome Email Error:', err.message);
    return { success: false, error: err.message };
  }
};
