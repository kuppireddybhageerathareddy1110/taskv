import Link from 'next/link';
import AccountList from '@/components/AccountList';

export default function Home() {
  return (
    <div className="flex flex-1 min-h-screen bg-[var(--color-background)] dark:bg-[var(--color-background)]">
      {/* Sidebar */}
      <div className="w-64 border-r border-[var(--color-border)]">
        <AccountList />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-wider uppercase mb-4 text-[var(--color-foreground)]">
            Customer 360 Dashboard
          </h1>
          <p className="text-muted-foreground text-[var(--color-secondary)]">
            Select an account from the list to view detailed customer insights, health scores,
            risks, opportunities, and recommended next actions.
          </p>
        </div>

        {/* Dashboard Overview Cards */}
        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Health Score */}
            <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-xs uppercase tracking-wider text-[var(--color-secondary)]">
                    Health Score
                  </h3>
                  <p className="text-xl font-bold text-[var(--color-foreground)]">78</p>
                </div>
                <div className="w-10 h-10 bg-[var(--color-success-bg)] rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"></path>
                  </svg>
                </div>
              </div>
              <p className="text-sm text-[var(--color-secondary)]">
                Customer health indicator
              </p>
            </div>

            {/* Risks */}
            <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-xs uppercase tracking-wider text-[var(--color-secondary)]">
                    Risks Identified
                  </h3>
                  <p className="text-xl font-bold text-[var(--color-error)]">2</p>
                </div>
                <div className="w-10 h-10 bg-[var(--color-error-bg)] rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--color-error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <p className="text-sm text-[var(--color-secondary)]">
                Active risks requiring attention
              </p>
            </div>

            {/* Opportunities */}
            <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-xs uppercase tracking-wider text-[var(--color-secondary)]">
                    Opportunities
                  </h3>
                  <p className="text-xl font-bold text-[var(--color-warning)]">3</p>
                </div>
                <div className="w-10 h-10 bg-[var(--color-warning-bg)] rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--color-warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path>
                  </svg>
                </div>
              </div>
              <p className="text-sm text-[var(--color-secondary)]">
                Expansion and upsell opportunities
              </p>
            </div>

            {/* Renewal Likelihood */}
            <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-xs uppercase tracking-wider text-[var(--color-secondary)]">
                    Renewal Likelihood
                  </h3>
                  <p className="text-xl font-bold text-[var(--color-primary)]">92%</p>
                </div>
                <div className="w-10 h-10 bg-[var(--color-primary)/10] rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path>
                  </svg>
                </div>
              </div>
              <p className="text-sm text-[var(--color-secondary)]">
                Probability of contract renewal
              </p>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mt-8">
            <h2 className="font-mono text-xl tracking-wider uppercase mb-4 text-[var(--color-foreground)]">
              How It Works
            </h2>
            <p className="text-muted-foreground text-[var(--color-secondary)]">
              The Customer 360 Dashboard integrates data from CRM systems, support tickets,
              Slack communications, and email history to provide a comprehensive view of
              customer health and relationships.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}