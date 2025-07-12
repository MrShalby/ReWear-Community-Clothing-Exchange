# ReWear - Sustainable Clothing Exchange Platform

A modern, sustainable clothing exchange platform where users can swap, redeem, and discover amazing clothing items with fellow members. Built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **User Authentication** - Secure signup/login with email verification
- **Clothing Marketplace** - Browse and list clothing items
- **Swap System** - Request swaps with other users
- **Points System** - Earn and redeem points for items
- **Real-time Notifications** - Email notifications for important events
- **Admin Panel** - Manage items and user requests
- **Responsive Design** - Works perfectly on all devices

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Headless UI
- **Routing**: React Router DOM
- **Email**: EmailJS for notifications
- **Build Tool**: Vite
- **Icons**: Heroicons + Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rewear-clothing-exchange.git
   cd rewear-clothing-exchange
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   Then edit `.env` with your actual configuration values.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## ⚙️ Configuration

### EmailJS Setup

1. Create an account at [EmailJS.com](https://www.emailjs.com/)
2. Set up an email service (Gmail, Outlook, etc.)
3. Create an email template with variables:
   - `{{to_name}}` - User's name
   - `{{cta_link}}` - Dashboard link
4. Update your `.env` file with:
   ```
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   ```

### Environment Variables

Copy `env.example` to `.env` and fill in your values:

```env
# EmailJS Configuration
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key_here
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id_here

# App Configuration
VITE_APP_NAME=ReWear
VITE_APP_URL=http://localhost:5173
VITE_DASHBOARD_URL=http://localhost:5173/dashboard
```

## 🎯 Usage

### For Users

1. **Sign Up** - Create an account with your email
2. **Browse Items** - Explore clothing items from other users
3. **List Items** - Upload your own clothing items
4. **Request Swaps** - Send swap requests to other users
5. **Earn Points** - Complete swaps to earn points
6. **Redeem Items** - Use points to redeem clothing items

### For Admins

1. **Access Admin Panel** - Use admin credentials to access `/admin`
2. **Approve Items** - Review and approve new clothing listings
3. **Manage Users** - Monitor user activity and requests
4. **System Overview** - View platform statistics

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, etc.)
├── data/              # Mock data and interfaces
├── pages/             # Page components
├── App.tsx            # Main app component
└── main.tsx           # App entry point
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features

1. Create components in `src/components/`
2. Add pages in `src/pages/`
3. Update routing in `App.tsx`
4. Add types in `src/data/` if needed

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [EmailJS](https://www.emailjs.com/) - Email service
- [Heroicons](https://heroicons.com/) - Icons
- [Vite](https://vitejs.dev/) - Build tool

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact us at support@rewear.com

---

**Made with ❤️ for sustainable fashion** 