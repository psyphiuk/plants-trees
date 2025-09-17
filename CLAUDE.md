# Project: Landscaping Materials Marketplace

## Overview
This is a tree company automation project creating an Amazon-style marketplace for landscaping materials with sophisticated partner attribution system. The client is a two-month-old startup with aggressive scaling goals, backed by an experienced franchise operator.

## Business Model
- Commission-based partnership model (10% gross revenue share for lifetime customer attribution)
- Cash-on-delivery business model (no online payment integration needed)
- Mom-and-pop shop partnerships with QR code/URL attribution tracking
- Seasonal urgency - targeting spring deployment

## Technology Stack
- **Framework**: Next.js on Vercel
- **Database**: Supabase (PostgreSQL)
- **Styling**: SCSS modules (NO Tailwind)
- **Package Manager**: Corepack Yarn (NEVER use npm)
- **Language**: TypeScript

## Core Features

### 1. Partner Attribution System
- UTM-style parameter tracking for lifetime customer-to-partner association
- Automatic partner assignment via QR codes or unique URLs
- Commission tracking and calculation

### 2. Bilingual Form System
- Automatic browser language detection (English/Spanish)
- No manual language selection required
- Blue-collar landscaper-friendly UI

### 3. Product Management
- CSV upload for product lists with pricing
- Fuzzy matching for regional naming variations
- Real-time pricing updates with rollback capabilities

### 4. Quote Generation
- Automated quotes within 2 minutes of submission
- Confirmation workflow before sales team notification
- Integration with sales team processes

### 5. Admin Portal
- Client onboarding and setup wizards
- Sales history and commission tracking
- Product list management
- Analytics and conversion tracking
- CSV export for accounting software (QuickBooks)

## Development Guidelines

### Code Standards
- Use TypeScript for all new code
- Follow existing component patterns
- Implement proper error handling and validation
- Create reusable components for common UI patterns

### Database Schema
- Multi-level attribution tracking (partners, customers, transactions)
- Audit trails for all data modifications
- Proper indexing for performance

### Security Considerations
- Secure partner URL generation
- Input validation on all forms
- Rate limiting on quote submissions
- Admin role-based access control

### UI/UX Priorities
- Accessibility for blue-collar landscapers
- Mobile-first responsive design
- Intuitive navigation with minimal complexity
- Fast load times for field use

## Workflow Automation

### Customer Journey
1. QR code scan or URL visit
2. Language auto-detection
3. Product selection with fuzzy matching
4. Quote submission
5. Admin confirmation
6. Sales team notification
7. Quote delivery

### Admin Workflows
1. Partner onboarding
2. URL/QR generation
3. Product list updates via CSV
4. Commission tracking
5. Sales analytics review

## Future Considerations
- Voice agent integration for drop-off points
- CRM integration (Go High Level/HubSpot)
- Advanced marketing automation
- Expanded product matching intelligence

## Budget & Timeline
- Initial investment: £2,500-£5,000
- Spring deployment target
- Phased implementation approach

## Important Notes
- **ALWAYS use `corepack yarn` for ALL package management - NEVER use `npm`**
- **DO NOT use Tailwind CSS - use SCSS modules instead**
- Prefer editing existing files over creating new ones
- Focus on core automation before advanced features
- Maintain simplicity for non-technical users
- All yarn commands must be prefixed with `corepack`