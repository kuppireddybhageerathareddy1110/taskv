import Link from 'next/link';
import AccountList from '@/components/AccountList';
import Card from '@/components/ui/Card';

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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-wider uppercase mb-2 text-[var(--color-foreground)] font-[Fira_Sans]">
                Customer 360 Dashboard
              </h1>
              <p className="text-muted-foreground text-[var(--color-secondary)]">
                Real-time customer intelligence platform
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-primary)/10] text-[var(--color-primary)] rounded-lg text-sm font-medium hover:bg-[var(--color-primary)/20] transition-enhanced">
                <span className="material-icons">notifications</span>
                Notifications
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-lg text-sm font-medium hover:bg-[var(--color-primary)/90] transition-enhanced">
                <span className="material-icons">account_circle</span>
                Profile
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Overview Cards */}
        <div className="mb-8">
          <h2 className="font-mono text-xl tracking-wider uppercase mb-4 text-[var(--color-foreground)] font-[Fira_Sans]">
            Key Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Health Score */}
            <div className="metric-card">
              <div className="mb-4">
                <h3 className="font-medium text-xs uppercase tracking-wider text-[var(--color-secondary)]">
                  Health Score
                </h3>
                <div className="flex items-baseline mt-2">
                  <p className="text-3xl font-bold text-[var(--color-foreground)] font-[Fira_Sans]">
                    78
                  </p>
                  <span className="ml-2 text-sm text-[var(--color-success)">+5% vs last week</span>
                </div>
              </div>
              <div className="h-4 w-full bg-[var(--color-success-bg)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-success)] w-[78%] transition-all duration-1000"></div>
              </div>
              <p className="text-xs text-[var(--color-secondary)] mt-1">
                Customer health indicator
              </p>
            </div>

            {/* Risks */}
            <div className="metric-card">
              <div className="mb-4">
                <h3 className="font-medium text-xs uppercase tracking-wider text-[var(--color-secondary)]">
                  Risks Identified
                </h3>
                <div className="flex items-baseline mt-2">
                  <p className="text-3xl font-bold text-[var(--color-error)] font-[Fira_Sans]">
                    2
                  </p>
                  <span className="ml-2 text-sm text-[var(--color-error)">+1 vs last week</span>
                </div>
              </div>
              <div className="h-4 w-full bg-[var(--color-error-bg)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-error)] w-[40%] transition-all duration-1000"></div>
              </div>
              <p className="text-xs text-[var(--color-secondary)] mt-1">
                Active risks requiring attention
              </p>
            </div>

            {/* Opportunities */}
            <div className="metric-card">
              <div className="mb-4">
                <h3 className="font-medium text-xs uppercase tracking-wider text-[var(--color-secondary)]">
                  Opportunities
                </h3>
                <div className="flex items-baseline mt-2">
                  <p className="text-3xl font-bold text-[var(--color-warning)] font-[Fira_Sans]">
                    3
                  </p>
                  <span className="ml-2 text-sm text-[var(--color-warning)">+2 vs last week</span>
                </div>
              </div>
              <div className="h-4 w-full bg-[var(--color-warning-bg)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-warning)] w-[60%] transition-all duration-1000"></div>
              </div>
              <p className="text-xs text-[var(--color-secondary)] mt-1">
                Expansion and upsell opportunities
              </p>
            </div>

            {/* Renewal Likelihood */}
            <div className="metric-card">
              <div className="mb-4">
                <h3 className="font-medium text-xs uppercase tracking-wider text-[var(--color-secondary)]">
                  Renewal Likelihood
                </h3>
                <div className="flex items-baseline mt-2">
                  <p className="text-3xl font-bold text-[var(--color-primary)] font-[Fira_Sans]">
                    92%
                  </p>
                  <span className="ml-2 text-sm text-[var(--color-success)">+3% vs last month</span>
                </div>
              </div>
              <div className="relative h-4 w-full">
                <div className="absolute inset-0 bg-[var(--color-primary)/10] rounded-full"></div>
                <div className="absolute inset-0 flex items-center pointer-events-none">
                  <div className="w-[92%] h-4 bg-[var(--color-primary)] rounded-full"></div>
                </div>
              </div>
              <p className="text-xs text-[var(--color-secondary)] mt-1">
                Probability of contract renewal
              </p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <h2 className="font-mono text-xl tracking-wider uppercase mb-4 text-[var(--color-foreground)] font-[Fira_Sans]">
            Customer Trends
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Health Trend */}
            <div className="chart-container">
              <div className="mb-4">
                <h3 className="font-medium text-sm uppercase tracking-wider text-[var(--color-secondary)]">
                  Health Score Trend (30 days)
                </h3>
                <p className="text-xs text-[var(--color-muted)]">
                  Average: 75.2 | Target: 80+
                </p>
              </div>
              <div className="h-32 w-full animate-in">
                <div className="chart-placeholder">
                  <div className="chart-bar gradient-bar-success" style={{ height: '70%', width: '78%' }}></div>
                </div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-[var(--color-muted)]">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>
            </div>

            {/* Revenue Trend */}
            <div className="chart-container">
              <div className="mb-4">
                <h3 className="font-medium text-sm uppercase tracking-wider text-[var(--color-secondary)]">
                  Monthly Recurring Revenue
                </h3>
                <p className="text-xs text-[var(--color-muted)]">
                  $124K | +12% MoM
                </p>
              </div>
              <div className="h-32 w-full animate-in">
                <div className="chart-placeholder">
                  <div className="chart-bar gradient-bar-warning" style={{ height: '60%', width: '70%' }}></div>
                </div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-[var(--color-muted)]">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-8">
          <h2 className="font-mono text-xl tracking-wider uppercase mb-4 text-[var(--color-foreground)] font-[Fira_Sans]">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="glass p-6 transition-enhanced hover-lift">
              <div className="w-12 h-12 mb-4 flex items-center justify-center bg-[var(--color-primary)/10] rounded-lg">
                <span className="material-icons text-[var(--color-primary)] text-xl">sync</span>
              </div>
              <h3 className="font-medium text-[var(--color-foreground)] mb-2">Data Integration</h3>
              <p className="text-sm text-[var(--color-muted)]">
                Connect CRM, support, and communication platforms
              </p>
            </div>
            <div className="glass p-6 transition-enhanced hover-lift">
              <div className="w-12 h-12 mb-4 flex items-center justify-center bg-[var(--color-warning)/10] rounded-lg">
                <span className="material-icons text-[var(--color-warning)] text-xl">analytics</span>
              </div>
              <h3 className="font-medium text-[var(--color-foreground)] mb-2">AI Analysis</h3>
              <p className="text-sm text-[var(--color-muted)]">
                Machine learning identifies patterns and risks
              </p>
            </div>
            <div className="glass p-6 transition-enhanced hover-lift">
              <div className="w-12 h-12 mb-4 flex items-center justify-center bg-[var(--color-success)/10] rounded-lg">
                <span className="material-icons text-[var(--color-success)] text-xl">lightbulb</span>
              </div>
              <h3 className="font-medium text-[var(--color-foreground)] mb-2">Actionable Insights</h3>
              <p className="text-sm text-[var(--color-muted)]">
                Get recommendations to improve customer health
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <h2 className="font-mono text-xl tracking-wider uppercase mb-4 text-[var(--color-foreground)] font-[Fira_Sans]">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {/* Activity Item 1 */}
            <div className="glass p-4 transition-enhanced hover-lift border-l-4 border-[var(--color-primary)]">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-[var(--color-primary)/10] rounded-full">
                  <span className="material-icons text-[var(--color-primary)]">error_outline</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-[var(--color-foreground)] flex justify-between">
                    <span>Account Alert: Acme Corp</span>
                    <time className="text-xs text-[var(--color-muted)]">2 min ago</time>
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    Health score dropped below 60 due to increased support tickets
                  </p>
                </div>
              </div>
            </div>

            {/* Activity Item 2 */}
            <div className="glass p-4 transition-enhanced hover-lift border-l-4 border-[var(--color-success)]">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-[var(--color-success)/10] rounded-full">
                  <span className="material-icons text-[var(--color-success)]">trending_up</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-[var(--color-foreground)] flex justify-between">
                    <span>Opportunity Identified: Global Inc</span>
                    <time className="text-xs text-[var(--color-muted)]">15 min ago</time>
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    Expansion opportunity detected in APAC region
                  </p>
                </div>
              </div>
            </div>

            {/* Activity Item 3 */}
            <div className="glass p-4 transition-enhanced hover-lift border-l-4 border-[var(--color-warning)]">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-[var(--color-warning)/10] rounded-full">
                  <span className="material-icons text-[var(--color-warning)]">lightbulb</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-[var(--color-foreground)] flex justify-between">
                    <span>Recommendation: TechSoft Ltd</span>
                    <time className="text-xs text-[var(--color-muted)]">1 hour ago</time>
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    Suggested upsell to premium support package
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}