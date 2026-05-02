const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send a confirmation email for a submitted loan application
 * @param {string} to - Recipient email
 * @param {string} name - Recipient name
 * @param {string} university - University applied for
 */
exports.sendApplicationConfirmation = async (to, name, university) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'RoiScholar <onboarding@resend.dev>',
      to: [to],
      subject: 'Application Received - RoiScholar',
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Hello ${name},</h2>
          <p>We've received your loan application for <strong>${university}</strong>.</p>
          <p>Our team is currently reviewing your details. You can track your application status on your dashboard.</p>
          <br />
          <p>Best regards,</p>
          <p><strong>The RoiScholar Team</strong></p>
        </div>
      `,
    });

    if (error) {
      console.error('Email Send Error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Email Service Error:', err);
    return { success: false, error: err.message };
  }
};

/**
 * Send a welcome email to a newly registered user
 */
exports.sendWelcomeEmail = async (to, name) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'RoiScholar <onboarding@resend.dev>',
      to: [to],
      subject: 'Welcome to RoiScholar!',
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Welcome, ${name}!</h2>
          <p>Thank you for joining RoiScholar. We're here to help you navigate your STEM education financing with clarity and transparency.</p>
          <p>Start by using our Loan Calculator or ROI Simulator to plan your future.</p>
          <br />
          <p>Best regards,</p>
          <p><strong>The RoiScholar Team</strong></p>
        </div>
      `,
    });

    if (error) {
      console.error('Email Send Error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Email Service Error:', err);
    return { success: false, error: err.message };
  }
};
