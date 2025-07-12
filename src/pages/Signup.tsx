import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
<<<<<<< HEAD
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init('A9yeoORl134-SW0P8');

// Password strength checker function
function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { label: "Weak", color: "red" };
  if (score === 3 || score === 4) return { label: "Medium", color: "orange" };
  if (score === 5) return { label: "Strong", color: "green" };
  return { label: "", color: "gray" };
}

const Signup = () => {
=======
import SuccessMessage from '../components/SuccessMessage';

// Helper function to get user-friendly error messages
const getErrorMessage = (error: string) => {
  if (error.includes('email-already-in-use')) {
    return 'An account with this email already exists. Please try logging in instead.';
  } else if (error.includes('weak-password')) {
    return 'Password is too weak. Please choose a stronger password.';
  } else if (error.includes('invalid-email')) {
    return 'Please enter a valid email address.';
  } else if (error.includes('network')) {
    return 'Network error. Please check your internet connection.';
  }
  return 'An error occurred. Please try again.';
};

const Signup: React.FC = () => {
>>>>>>> 999bc2e (Add Firebase authentication and database integration)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const { signup } = useAuth();
  const navigate = useNavigate();

  const strength = getPasswordStrength(password);

  // Email notification function
  const sendWelcomeEmail = async (userName: string, userEmail: string): Promise<boolean> => {
    try {
      console.log('Attempting to send email to:', userEmail);
      
      const templateParams = {
        to_name: userName,
        to_email: userEmail,
        cta_link: import.meta.env.VITE_DASHBOARD_URL || 'http://localhost:5173/dashboard',
        message: `Welcome to ReWear! We're excited to have you join our sustainable fashion community. Start exploring and swapping clothes today!`
      };

      console.log('Template params:', templateParams);

      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_rcaoomm',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_pc4y966',
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'A9yeoORl134-SW0P8'
      );

      console.log('EmailJS result:', result);
      console.log('Welcome email sent successfully!');
      return true;
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace'
      });
      
      // Fallback: Show manual email option
      const fallbackEmail = `mailto:${userEmail}?subject=Welcome to ReWear!&body=Hi ${userName},%0D%0A%0D%0AWelcome to ReWear! We're excited to have you join our sustainable fashion community.%0D%0A%0D%0AStart exploring and swapping clothes today: ${import.meta.env.VITE_DASHBOARD_URL || 'http://localhost:5173/dashboard'}%0D%0A%0D%0AHappy swapping,%0D%0AThe ReWear Team`;
      
      console.log('EmailJS failed, using fallback email link:', fallbackEmail);
      return false;
    }
  };

=======
  const [showSuccess, setShowSuccess] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

>>>>>>> 999bc2e (Add Firebase authentication and database integration)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const success = await signup(name, email, password);
      if (success) {
<<<<<<< HEAD
        // Send welcome email notification
        const emailSent = await sendWelcomeEmail(name, email);
        
        // Show success message
        if (emailSent) {
          alert('Account created successfully! Welcome email sent.');
        } else {
          alert('Account created successfully! Welcome email will be sent shortly.');
        }
        
        navigate('/dashboard');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
=======
        // Show success message before redirecting
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (err: any) {
      setError(getErrorMessage(err.message || 'An error occurred. Please try again.'));
>>>>>>> 999bc2e (Add Firebase authentication and database integration)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Join the ReWear Community
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Start your sustainable fashion journey today
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-green-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            
<<<<<<< HEAD
=======
            {showSuccess && (
              <SuccessMessage
                title="Account Created Successfully!"
                message="Welcome to ReWear! You're now logged in and will be redirected to your dashboard."
              />
            )}
            
>>>>>>> 999bc2e (Add Firebase authentication and database integration)
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 pr-10"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
<<<<<<< HEAD
              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2 flex items-center space-x-2">
                  <span
                    className="text-sm font-medium"
                    style={{ color: strength.color }}
                  >
                    {strength.label} password
                  </span>
                  <div className="w-24 h-2 bg-gray-200 rounded">
                    <div
                      className="h-2 rounded"
                      style={{
                        width:
                          strength.label === "Weak"
                            ? "33%"
                            : strength.label === "Medium"
                            ? "66%"
                            : "100%",
                        backgroundColor: strength.color,
                      }}
                    />
                  </div>
                </div>
              )}
=======
>>>>>>> 999bc2e (Add Firebase authentication and database integration)
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-orange-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-all duration-200"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Signup;
=======
export default Signup;
>>>>>>> 999bc2e (Add Firebase authentication and database integration)
