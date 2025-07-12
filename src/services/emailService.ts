import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key

export interface WelcomeEmailData {
  user_name: string;
  user_email: string;
  points: number;
}

export const sendWelcomeEmail = async (data: WelcomeEmailData): Promise<boolean> => {
  try {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_name: data.user_name,
        to_email: data.user_email,
        points: data.points,
        message: `Welcome to ReWear! You've been awarded ${data.points} points to start your sustainable fashion journey.`
      }
    );
    
    console.log('Welcome email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return false;
  }
};

export const sendSwapRequestEmail = async (data: {
  requesterName: string;
  requesterEmail: string;
  itemTitle: string;
  message: string;
  ownerEmail: string;
  ownerName: string;
}): Promise<boolean> => {
  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'swap_request_template', // You would need to create this template
      {
        requester_name: data.requesterName,
        requester_email: data.requesterEmail,
        item_title: data.itemTitle,
        message: data.message,
        owner_name: data.ownerName,
        owner_email: data.ownerEmail
      }
    );
    
    console.log('Swap request email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Failed to send swap request email:', error);
    return false;
  }
};

// Fallback function for when EmailJS is not configured
export const sendWelcomeEmailFallback = (data: WelcomeEmailData): boolean => {
  console.log('Welcome email would be sent to:', data.user_email);
  console.log('Email content:', {
    subject: 'Welcome to ReWear!',
    body: `Hi ${data.user_name},\n\nWelcome to ReWear! You've been awarded ${data.points} points to start your sustainable fashion journey.\n\nBest regards,\nThe ReWear Team`
  });
  return true;
}; 