# Phase 1 Implementation - MVP

## Project Setup
- [ ] Initialize Next.js 14 app with TypeScript
- [ ] Set up SCSS modules structure
- [ ] Configure Google Fonts (Inter + Merriweather)
- [ ] Create basic responsive layout
- [ ] Set up environment variables structure

## Core Data Structure
- [ ] Create hardcoded product list with common landscaping materials:
  - Mulch (Red, Brown, Black)
  - Topsoil
  - Gravel (Pea, River Rock, Crushed Stone)
  - Sand (Play, Mason, Fill)
  - Decorative Stone
- [ ] Simple JSON structure for easy replacement
- [ ] Include price per unit and unit types

## Partner Attribution System
- [ ] Create partner URL structure (`/quote?partner=PARTNER_CODE`)
- [ ] Generate simple partner codes (e.g., `SHP001`, `SHP002`)
- [ ] Store partner attribution in browser localStorage
- [ ] Display partner info on quote form

## Quote Form
- [ ] Simple multi-step form:
  1. Customer info (name, phone, email)
  2. Delivery address
  3. Product selection with quantity
  4. Review & submit
- [ ] Browser language detection (English/Spanish)
- [ ] Form validation
- [ ] Store submissions in localStorage (temporary)

## Admin Dashboard
- [ ] Simple password-protected admin route
- [ ] View submitted quotes (from localStorage)
- [ ] Mark quotes as "contacted" or "completed"
- [ ] Basic partner list with generated URLs
- [ ] CSV export of quotes

## Styling & UX
- [ ] Clean, professional design inspired by Southern High Farms branding
- [ ] Mobile-first responsive layout
- [ ] Simple color scheme (green, earth tones)
- [ ] Large, touch-friendly buttons for field use
- [ ] Clear typography with Google Fonts

## Testing & Deployment
- [ ] Test form submission flow
- [ ] Test partner attribution tracking
- [ ] Test bilingual functionality
- [ ] Deploy to Vercel
- [ ] Configure custom domain

## Nice-to-Have (if time permits)
- [ ] QR code generation for partner URLs
- [ ] Email notification for new quotes (using Vercel Functions)
- [ ] Basic analytics (quote count per partner)
- [ ] Print-friendly quote view

## Notes
- Keep everything in localStorage/session storage for now
- No Supabase integration in Phase 1
- Focus on core workflow: Partner → Customer → Quote → Admin
- Hardcoded product list in `/lib/products.ts` for easy updates
- Simple authentication (environment variable password)

## Success Criteria
✓ Partners can share their unique URL
✓ Customers can submit quotes in English or Spanish
✓ Admins can view and export quotes
✓ Attribution tracking works correctly
✓ Mobile-friendly and field-ready