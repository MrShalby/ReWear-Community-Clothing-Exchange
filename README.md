# ReWear - Community Clothing Exchange Platform

A sustainable fashion platform where users can exchange unused clothing items via direct swaps or a point-based system. Built with React, TypeScript, Firebase, and Tailwind CSS.

## 🌟 Features

### ✅ Completed Features

#### **Landing Page**
- Beautiful hero section with project introduction
- Featured items carousel with real-time data
- Call-to-action buttons: "Start Swapping", "Browse Items", "List an Item"
- Features section highlighting sustainability benefits
- Responsive design with smooth animations

#### **User Authentication**
- Email/password-based signup and login
- Firebase Auth integration with real-time user state
- Automatic redirect to dashboard after login
- User profile management with role-based access
- Admin login with special credentials

#### **User Dashboard**
- Real-time user statistics (points, items listed, swaps completed)
- Quick action buttons for common tasks
- Display of user's uploaded items with status
- Recent swap requests with real-time updates
- Success messages and loading states

#### **Item Management**
- **Add New Item**: Complete form with image upload, validation, and Firebase integration
- **Item Detail Page**: Full item information with image gallery, swap/points options
- **Browse Items**: Real-time item browsing with search and filtering
- **Image Handling**: Local previews, Firebase Storage integration, error fallbacks

#### **Swap System**
- **Direct Swap Requests**: Users can request item swaps with custom messages
- **Points System**: Redeem items using earned points
- **Real-time Status**: Track swap request status (pending, completed, rejected)
- **Firebase Integration**: All swap data stored and synced in real-time

#### **Admin Panel**
- **Item Moderation**: Approve/reject item listings with notes
- **Content Management**: Delete inappropriate items
- **Statistics Dashboard**: View platform metrics and user activity
- **Role-based Access**: Admin-only features with proper authentication

#### **Profile Management**
- User statistics and activity tracking
- Account information display
- Points balance and transaction history
- Responsive profile interface

### 🔧 Technical Features

- **Real-time Data**: Firebase Firestore for live updates
- **Image Storage**: Firebase Storage for item images
- **Authentication**: Secure user management with Firebase Auth
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error states and fallbacks
- **Loading States**: Smooth loading experiences throughout
- **Form Validation**: Client-side validation with user feedback

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project setup

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MrShalby/ReWear-Community-Clothing-Exchange.git
   cd ReWear-Community-Clothing-Exchange/project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `env.example` to `.env.local`
   - Fill in your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Firebase Setup**
   - Create a Firebase project
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Enable Storage
   - Set up security rules (see `FIREBASE_SETUP.md`)

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Build for Production**
   ```bash
   npm run build
   ```

## 🔥 Firebase Configuration

### Required Services

1. **Authentication**
   - Enable Email/Password sign-in method
   - Set up admin user: `admin@rewear.com` / `admin123`

2. **Firestore Database**
   - Collections: `users`, `items`, `swaps`
   - Security rules configured for user data protection

3. **Storage**
   - Configure for image uploads
   - Set up security rules for authenticated users

### Security Rules

See `FIREBASE_SETUP.md` for detailed security configuration.

## 📱 Demo Credentials

### Regular User
- **Email**: `user@example.com`
- **Password**: `password123`

### Admin User
- **Email**: `admin@rewear.com`
- **Password**: `admin123`

## 🎨 Design Features

- **Modern UI**: Clean, sustainable-themed design
- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Loading States**: Skeleton screens and progress indicators

## 🔧 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Build Tool**: Vite
- **Email**: EmailJS (configured but optional)
- **Icons**: Heroicons
- **Routing**: React Router v6

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, Firebase)
├── pages/             # Main application pages
├── config/            # Firebase configuration
├── hooks/             # Custom React hooks
├── services/          # External services (EmailJS)
├── data/              # Mock data and types
└── assets/            # Static assets
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder
3. Configure environment variables

### Firebase Hosting
1. Install Firebase CLI
2. Run `firebase init hosting`
3. Deploy with `firebase deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Firebase for backend services
- Tailwind CSS for styling
- Heroicons for beautiful icons
- The sustainable fashion community

## 📞 Support

For support or questions, please open an issue on GitHub or contact the development team.

---

**ReWear** - Making sustainable fashion accessible to everyone! 🌱👕 