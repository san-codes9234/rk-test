import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  // Add debug logging
  console.log('[API/Contact] Request received:', req.method);

  try {
    // 1. Only allow POST
    if (req.method !== 'POST') {
      console.error('[API/Contact] Method Not Allowed:', req.method);
      return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    // 2. Verify RESEND_API_KEY
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('[API/Contact] Missing RESEND_API_KEY environment variable');
      return res.status(500).json({ success: false, message: 'Server configuration error: Email service unavailable' });
    }

    const resend = new Resend(apiKey);

    // 3. Parse Body securely
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        console.error('[API/Contact] Failed to parse request body as JSON');
        return res.status(400).json({ success: false, message: 'Invalid JSON body' });
      }
    }

    if (!body) {
       console.error('[API/Contact] Empty request body');
       return res.status(400).json({ success: false, message: 'Empty request body' });
    }

    const { name, email, company, message, _honeypot } = body;

    // 4. Anti-spam honeypot check
    if (_honeypot) {
      console.log('[API/Contact] Honeypot triggered, silently dropping');
      return res.status(200).json({ success: true, message: 'Message received.' });
    }

    // 5. Validate Required Fields
    if (!name || !email || !message) {
      console.error('[API/Contact] Missing required fields:', { name: !!name, email: !!email, message: !!message });
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    console.log('[API/Contact] Sending emails via Resend...');

    // 6. Send Emails (Admin Notification + Visitor Acknowledgement)
    const adminEmail = resend.emails.send({
      from: 'R.K. Erectors <onboarding@resend.dev>', // Must be a verified domain for production
      to: '23053359@kiit.ac.in',
      replyTo: email,
      subject: `New Contact Inquiry from ${name} - ${company || 'No Company'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">New Website Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; color: #333; line-height: 1.6;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      `
    });

    const visitorEmail = resend.emails.send({
      from: 'R.K. Erectors <onboarding@resend.dev>', // Must be a verified domain for production
      to: email, // Sending to the visitor's email
      subject: `We've received your inquiry - R.K. Erectors`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #d4af37; margin-bottom: 20px;">Thank you for reaching out!</h2>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">Dear ${name},</p>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">This is an automated message to confirm that we have successfully received your inquiry at <strong>R.K. Erectors</strong>.</p>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">Our team is reviewing your message and will get back to you within <strong>1-2 business days</strong>.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #d4af37;">
            <h3 style="margin-top: 0; color: #1a1a1a;">For immediate assistance, please contact us at:</h3>
            <p style="margin: 5px 0; color: #555;">📞 +91 9110146650</p>
            <p style="margin: 5px 0; color: #555;">📞 +91 9431381900</p>
            <p style="margin: 5px 0; color: #555;">☎️ 0657 2210 122</p>
            <p style="margin: 5px 0; color: #555;">✉️ r.k.erectorsjsr@gmail.com</p>
          </div>
          
          <p style="color: #777; font-size: 14px; border-top: 1px solid #eaeaea; padding-top: 20px;">
            Best Regards,<br>
            <strong>The R.K. Erectors Team</strong><br>
            Building Tomorrow. Erecting Excellence.
          </p>
        </div>
      `
    });

    // Execute both email requests concurrently
    const [adminResult, visitorResult] = await Promise.all([adminEmail, visitorEmail]);

    // Check if the admin email failed (critical failure)
    if (adminResult.error) {
      console.error('[API/Contact] Admin Email Error:', adminResult.error);
      return res.status(400).json({ success: false, message: adminResult.error.message });
    }

    // Check if the visitor email failed (non-critical, usually happens on free Resend tier due to unverified domain)
    if (visitorResult.error) {
      console.warn('[API/Contact] Visitor Auto-Reply Failed (Likely unverified domain):', visitorResult.error);
      // We still return success to the user because the main inquiry was received
    }

    console.log('[API/Contact] Emails successfully processed');
    return res.status(200).json({ success: true, message: 'Email sent successfully' });

  } catch (error: any) {
    console.error('[API/Contact] Unhandled Server Error:', error);
    // Ensure we ALWAYS return valid JSON
    return res.status(500).json({ 
      success: false, 
      message: error?.message || 'Internal Server Error' 
    });
  }
}
