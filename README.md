# Landscaping Materials Marketplace

A modern marketplace platform connecting landscaping material suppliers with contractors through partner-attributed ordering and automated quote generation.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Yarn (via corepack)
- Supabase account
- Vercel account

### Installation

```bash
# Enable corepack for yarn
corepack enable

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env.local

# Run development server
yarn dev
```

## 📋 Features

### For Partners (Mom-and-Pop Shops)
- **Unique Attribution URLs** - Custom QR codes and links for customer tracking
- **Lifetime Commission Tracking** - 10% gross revenue share on all attributed sales
- **Simple Onboarding** - Quick setup process with admin assistance
- **Sales Analytics** - Track referred customers and commission earnings

### For Customers (Landscapers)
- **Bilingual Support** - Automatic English/Spanish detection
- **Quick Quote Generation** - Receive quotes within 2 minutes
- **Product Search** - Smart matching for regional product name variations
- **Mobile-Optimized** - Designed for field use on any device

### For Administrators
- **Partner Management** - Onboard partners and generate attribution codes
- **Product Catalog** - CSV upload/download for bulk pricing updates
- **Order Processing** - Review and confirm quotes before sales handoff
- **Analytics Dashboard** - Track conversions, drop-offs, and partner performance
- **Accounting Integration** - Export data for QuickBooks and other systems

## 🏗️ Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Next.js   │────▶│   Supabase  │────▶│   Vercel    │
│   Frontend  │     │   Database  │     │   Hosting   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                    │                    │
       ▼                    ▼                    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Tailwind   │     │ PostgreSQL  │     │     CDN     │
│     CSS     │     │   Storage   │     │   Caching   │
└─────────────┘     └─────────────┘     └─────────────┘
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **Package Manager**: Yarn

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin portal pages
│   ├── partner/           # Partner dashboard
│   └── quote/             # Customer quote forms
├── components/            # React components
├── lib/                   # Utility functions
│   ├── supabase/         # Database client
│   └── utils/            # Helper functions
├── public/               # Static assets
└── types/                # TypeScript definitions
```

## 🔧 Configuration

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Application
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## 📊 Database Schema

### Core Tables
- `partners` - Partner organizations and attribution codes
- `customers` - Customer information with partner attribution
- `products` - Product catalog with pricing
- `quotes` - Generated quotes and order history
- `commissions` - Partner commission tracking

## 🚦 Development Workflow

### Local Development
```bash
yarn dev        # Start development server
yarn build      # Build for production
yarn lint       # Run ESLint
yarn type-check # Run TypeScript compiler
```

### Database Migrations
```bash
yarn supabase:migrate    # Run migrations
yarn supabase:generate   # Generate types
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📝 License

Private and confidential - All rights reserved

## 👥 Team

- **Client**: Erik Bledsoe - Tree company automation startup
- **Developer**: Simon Filtness - Full-stack development

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Basic quote generation system
- ✅ Partner attribution tracking
- ✅ Admin portal
- ✅ CSV import/export

### Phase 2
- ⏳ Advanced product matching AI
- ⏳ Voice agent integration
- ⏳ CRM system integration

### Phase 3
- ⏳ Marketing automation
- ⏳ Advanced analytics
- ⏳ Multi-vendor marketplace features

## 📞 Support

For technical issues or questions, please contact the development team.
