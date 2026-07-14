# Customer 360 Dashboard

A comprehensive customer intelligence platform that unifies CRM data, support tickets, communication signals, and health scoring to drive proactive customer success.

![Customer 360 Dashboard Preview](https://via.placeholder.com/1200x600?text=Customer+360+Dashboard)

## Overview

The Customer 360 Dashboard provides a unified view of customer health and relationships by integrating data from multiple sources including CRM systems, support tickets, Slack communications, and email history. Built with Next.js and Tailwind CSS, this dashboard implements professional B2B SaaS design principles for optimal user experience.

## Key Features

### 📊 **Customer Health Scoring**
- Real-time health scores (0-100) with color-coded status indicators
- Trend analysis and historical performance tracking
- Configurable scoring algorithms based on business rules

### ⚠️ **Risk & Opportunity Detection**
- Automated identification of churn risks and expansion opportunities
- Sentiment analysis from communication channels
- Priority-based alerting system

### 💬 **Unified Communication Timeline**
- Chronological view of all customer interactions
- Integrated view of Slack messages, email threads, and support tickets
- Filterable by type, date range, and priority

### 🎯 **Next Best Action Recommendations**
- Data-driven suggestions for customer engagement
- Clear rationale behind each recommendation
- One-click action initiation

### 📱 **Responsive Design**
- Optimized for desktop, tablet, and mobile devices
- Collapsible sidebar navigation on smaller screens
- Adaptive card layouts and data visualization

### ♿ **Accessibility Compliant**
- WCAG 2.1 AA certified
- Proper color contrast ratios (minimum 4.5:1)
- Keyboard navigable interface
- Screen reader friendly

## Technology Stack

- **Framework**: Next.js 16.2.10 (App Router)
- **Styling**: Tailwind CSS with custom design system
- **Language**: TypeScript
- **State Management**: React Hooks
- **Icons**: Heroicons
- **Fonts**: Plus Jakarta Sans (primary), Geist (system)

## Design System

This implementation follows UI/UX Pro Max principles for professional B2B applications:

### Color Palette
```css
--color-primary: #0F172A;   /* Navy - Trust & Professionalism */
--color-secondary: #334155; /* Slate - Neutral Information */
--color-accent: #0369A1;    /* Blue - CTAs & Interaction */
--color-background: #F8FAFC; /* Light Gray - Canvas */
--color-foreground: #020617; /* Dark Navy - Primary Text */

/* Status Colors */
--color-success: #10B981;   /* Green */
--color-warning: #FBBF24;   /* Amber */
--color-error: #EF4444;     /* Red */
```

### Typography
- **Primary Font**: Plus Jekarta Sans (300-700 weights)
- **System Font**: Geist (for optimal system integration)

### Spacing & Layout
- 4px/8px spacing system for consistency
- Mobile-first responsive design
- Clear visual hierarchy and information architecture

## Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm, yarn, or pnpm package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/kuppireddybhageerathareddy1110/taskv.git
cd taskv

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development
```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Building for Production
```bash
# Create production build
npm run build
# or
yarn build
# or
pnpm build

# Start production server
npm start
# or
yarn start
# or
pnpm start
```

## Project Structure

```
/app
  /account/[id] - Dynamic route for customer dossier views
  page.tsx - Main dashboard with overview metrics
  layout.tsx - Root layout with providers and global styling
/components
  AccountDossier.tsx - Detailed customer view component
  AccountList.tsx - Sidebar navigation component
  /ui - Reusable UI components (Button, Badge, Card)
/lib
  mockData.ts - Simulated CRM data and interaction logs
  utils.ts - Helper functions for data processing
/styles
  globals.css - Custom CSS variables, base styles, and theme
/public
  Static assets (images, icons, etc.)
```

## Core Components

### AccountList
The sidebar navigation panel displaying all customer accounts with:
- Account name and industry
- Health status indicators (color-coded badges)
- Quick-view metrics (ARR, plan, owner)
- Navigation to individual customer dossiers

### AccountDossier
The main customer detail view featuring:
- **Header**: Customer information and prominent health score display
- **Next Best Action**: Recommended engagement strategy with rationale
- **Risk Assessment**: Identified risks with severity levels and descriptions
- **Opportunity Identification**: Growth opportunities with potential value
- **Communication Timeline**: Unified view of all customer interactions
- **Support Ticket Management**: Open/resolved tickets with filtering

### UI Component Library
Reusable components built with accessibility and consistency:
- **Button**: Multiple variants (primary, secondary, destructive, outline, ghost, link)
- **Badge**: Status indicators for health scores, risks, and opportunities
- **Card**: Container component with consistent styling and elevation
- **Avatar**: User/customer image display with fallbacks
- **Tooltip**: Informational hover text for complex elements

## Data Model

The dashboard simulates data from multiple enterprise sources:

### CRM Accounts
```typescript
{
  id: string;
  name: string;
  arr: number;           // Annual Recurring Revenue
  industry: string;
  owner: string;
  renewal: string;       // YYYY-MM-DD format
  plan: string;
  healthScore: number;
  healthTier: 'healthy' | 'watch' | 'risk';
}
```

### Interaction Records
```typescript
{
  id: string;
  type: 'slack' | 'email' | 'ticket';
  timestamp: string;
  content: string;
  metadata: {
    channel?: string;           // For Slack
    subject?: string;           // For Email
    priority?: 'High' | 'Medium' | 'Low';
    status?: 'Open' | 'Resolved';
    replied?: boolean;          // For Email
    daysAgo: number;
  }
}
```

### Analytics
```typescript
{
  score: number;              // Health score (0-100)
  tier: 'healthy' | 'watch' | 'risk';
  risks: string[];            // Identified risk factors
  opportunities: string[];    // Growth opportunities
  nba: string;                // Next best action
  why: string;                // Rationale for recommendation
  daysToRenewal: number;      // Days until contract renewal
  unreplied: Email[];         // Unresponded emails requiring attention
}
```

## Health Scoring Algorithm

The health score is calculated using a weighted formula that considers:

### Risk Factors (Negative Impact)
- **Unresolved High-Priority Tickets**: -12 points each
- **Unanswered Emails (>2 days)**: -8 points each
- **Competitor Mentions in Slack**: -15 points
- **Executive Escalation Requests**: -10 points
- **Champion Role Changes**: -14 points
- **Renewal Within 21 Days**: -10 points

### Positive Factors (Positive Impact)
- **Expansion Intent Signals**: +6 points each
- **Proactive Renewal Conversations**: +10 points
- **Multi-site Rollout Interest**: +8 points each
- **No Active Risks**: +5 points bonus

Score is clamped between 5-98 to ensure meaningful variation while avoiding extreme values.

## Accessibility Features

This implementation prioritizes accessibility with:

- **Color Contrast**: All text meets WCAG AA minimum contrast ratios (4.5:1)
- **Keyboard Navigation**: Full keyboard support with visible focus states
- **Screen Reader Support**: Semantic HTML and ARIA labels where needed
- **Responsive Touch Targets**: Minimum 44×44px for interactive elements
- **Reduced Motion**: Respects user preferences for minimized animation
- **Text Scaling**: Supports user-initiated text size adjustments
- **Error Prevention**: Clear form validation and recovery options

## Performance Optimizations

- **Code Splitting**: Automatic route-based splitting by Next.js
- **Lazy Loading**: Non-critical components load on demand
- **Efficient Rendering**: Memoization and useCallback for expensive operations
- **Optimized Data Processing**: Efficient algorithms for health scoring
- **Minimal CSS**: PurgeCSS removes unused styles in production
- **Asset Optimization**: Next.js Image component for optimal image delivery

## Future Development

Planned enhancements for future versions:

1. **Real-Time Updates**: WebSocket integration for live data feeds
2. **Advanced Analytics**: Machine learning models for predictive churn scoring
3. **Customizable Dashboards**: Drag-and-drop widget configuration
4. **Export Functionality**: PDF/CSV export of reports and dashboards
5. **Role-Based Access Control**: Granular permissions for different user types
6. **Integration Framework**: Pre-built connectors for Salesforce, HubSpot, Zendesk, etc.
7. **Mobile Applications**: Native iOS/Android companion apps
8. **Multi-tenancy**: Support for multiple organizations/instances
9. **Audit Trail**: Comprehensive activity logging for compliance
10. **API Access**: RESTful and GraphQL APIs for external system integration

## Deployment

This application is ready for deployment to various platforms:

### Vercel (Recommended)
```bash
vercel
```

### Netlify
```bash
netlify deploy --prod
```

### Docker
```bash
docker build -t customer-360-dashboard .
docker run -p 3000:3000 customer-360-dashboard
```

### Traditional Node.js Hosting
```bash
npm run build
npm start
```

## Contributing

We welcome contributions to improve the Customer 360 Dashboard:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows:
- TypeScript strict mode
- ESLint configuration
- Accessibility guidelines (WCAG 2.1 AA)
- Responsive design principles
- Component reusability standards

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Volopay's Growth Squad hiring challenge
- Built with Next.js and Tailwind CSS
- Icons provided by Heroicons
- Fonts: Plus Jakarta Sans (Google Fonts) and Geist (Vercel)
- Design principles adapted from UI/UX Pro Max methodology

---

**Created with ❤️ for customer success teams everywhere**