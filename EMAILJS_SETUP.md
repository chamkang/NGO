# EmailJS Setup Instructions

## Configuration Details
- **Professional Email**: info@amissolidairesgatineau.org
- **Service ID**: service_ds68sbc
- **SMTP Server**: mail.privateemail.com
- **Port**: 465

## Setup Steps

### 1. EmailJS Account Setup
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Create an account or sign in
3. Go to Email Services and add a new service
4. Choose "Custom SMTP" and configure:
   - **Service ID**: service_ds68sbc
   - **SMTP Server**: mail.privateemail.com
   - **Port**: 465
   - **Username**: info@amissolidairesgatineau.org
   - **Password**: [Your email password]
   - **Secure**: Yes (SSL/TLS)

### 2. Email Template Setup
1. Go to Email Templates in your EmailJS dashboard
2. Create a new template with the following content:

**Template Name**: Contact Form Template

**Subject**: New Contact Form Submission - {{subject}}

**Content**:
```
Hello,

You have received a new message from your website contact form:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Interest: {{interest}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from the LES AMIS SOLIDAIRES DE GATINEAU website contact form.
```

### 3. Update JavaScript Configuration
1. Open `js/contact-form.js`
2. Replace `YOUR_PUBLIC_KEY` with your actual EmailJS public key
3. Replace `YOUR_TEMPLATE_ID` with your actual template ID

### 4. Test the Forms
1. Open the website in a browser
2. Fill out the contact form on the contact page
3. Fill out the volunteer form on the home page
4. Check that emails are received at info@amissolidairesgatineau.org

## Files Updated
- ✅ All page footers updated with professional email
- ✅ Contact page email addresses updated
- ✅ Contact form configured for EmailJS
- ✅ Volunteer form configured for EmailJS
- ✅ EmailJS scripts added to relevant pages

## Pages with Updated Email Addresses
- index.html (footer + volunteer form)
- about.html (footer)
- blog.html (footer)
- contact.html (footer + contact info + form)
- donate.html (footer)
- blog-cancer-care.html (footer)
- blog-community-impact.html (footer)
- blog-homeless-meals.html (footer)
- blog-immigrant-support.html (footer)
- blog-partnership-success.html (footer)
- blog-single.html (footer)
- blog-volunteer-stories.html (footer)

## Security Notes
- Never commit your EmailJS private keys to version control
- Use environment variables or a secure config file for sensitive data
- Test email delivery thoroughly before going live
- Monitor email sending limits and usage in your EmailJS dashboard
