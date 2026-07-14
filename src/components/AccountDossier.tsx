// src/components/AccountDossier.tsx
"use client";

import { useEffect, useState } from 'react';
import { CRMAccount, crm, analyze, tickets, slack, emails } from '@/lib/mockData';

interface AccountDossierProps {
  accountId: string;
}

export default function AccountDossier({ accountId }: AccountDossierProps) {
  const [account, setAccount] = useState<CRMAccount | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    const acc = crm.find(a => a.id === accountId);
    if (acc) {
      setAccount(acc);
      setAnalysis(analyze(acc));
    }
  }, [accountId]);

  if (!account || !analysis) {
    return <div className="p-6 text-center">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)/10] mb-4">
        <span className="material-icons text-[var(--color-primary)] text-xl">hourglass_empty</span>
      </div>
      <p className="text-[var(--color-foreground)]">Loading account details...</p>
    </div>;
  }

  const { name, arr, industry, owner, plan, renewal } = account;
  const { score, tier, risks, opps, nba, why, daysToRenewal, unreplied } = analysis;
  const t = tickets[accountId] || [];
  const s = slack[accountId] || [];
  const e = emails[accountId] || [];

  // Determine status colors based on tier
  const scoreColor = tier === 'risk' ? 'text-[var(--color-error)]' :
                    tier === 'watch' ? 'text-[var(--color-warning)]' :
                    'text-[var(--color-success)]';
  const bgColor = tier === 'risk' ? 'bg-[var(--color-error-bg)]' :
                 tier === 'watch' ? 'bg-[var(--color-warning-bg)]' :
                 'bg-[var(--color-success-bg)]';
  const borderColor = tier === 'risk' ? 'border-[var(--color-error)]' :
                     tier === 'watch' ? 'border-[var(--color-warning)]' :
                     'border-[var(--color-success)]';

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-mono tracking-wider uppercase text-[var(--color-foreground)] font-semibold">{name}</h2>
          <div className="flex flex-wrap gap-4 text-xs font-mono text-[var(--color-secondary)] mt-2">
            <span>{industry} · {plan} plan · ARR ${arr.toLocaleString()} · Owner: {owner} · Renews {formatDate(renewal)} ({daysToRenewal}d)</span>
          </div>
        </div>
        <div className="text-center w-24">
          <div className={`rounded border p-6 ${bgColor} ${borderColor}`}>
            <div className={`text-5xl font-bold ${scoreColor} mb-1`}>{score}</div>
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-secondary)]">Health Score</div>
          </div>
        </div>
      </div>

      {/* Next Best Action Card */}
      <Card className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 items-center justify-center rounded-md bg-[var(--color-warning)] text-[var(--color-on-primary)] flex">
              <span className="material-icons text-lg">lightbulb</span>
            </div>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-warning)] mb-2">
              Recommended Next Best Action
            </h3>
            <p className="font-semibold text-[var(--color-foreground)] mb-2">{nba}</p>
            <div className="text-xs text-[var(--color-secondary)]">{why}</div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* Risks */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-error)]">
              Risks
            </h3>
            <div className="flex items-center space-x-2">
              <span className="material-icons text-[var(--color-error)]">warning_amber</span>
              <span className="text-xs text-[var(--color-secondary)]">{risks.length} items</span>
            </div>
          </div>
          {risks.length > 0 ? (
            risks.map((r: string, i: number) => (
              <div key={i} className="flex items-start space-x-3 my-2">
                <div className="flex-shrink-0 mt-1">
                  <span className="text-[var(--color-error)]">—</span>
                </div>
                <div className="flex-1 text-[var(--color-foreground)]">{r}</div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <span className="material-icons text-[var(--color-muted)] text-2xl mb-2 display-block">check_circle</span>
              <p className="text-sm text-[var(--color-secondary)]">No risks detected.</p>
            </div>
          )}
        </Card>

        {/* Opportunities */}
        <div className="border p-6 bg-[var(--color-background)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-success)]">
              Opportunities
            </h3>
            <div className="flex items-center space-x-2">
              <span className="material-icons text-[var(--color-success)]">trending_up</span>
              <span className="text-xs text-[var(--color-secondary)]">{opps.length} items</span>
            </div>
          </div>
          {opps.length > 0 ? (
            opps.map((o: string, i: number) => (
              <div key={i} className="flex items-start space-x-3 my-2">
                <div className="flex-shrink-0 mt-1">
                  <span className="text-[var(--color-success)]">—</span>
                </div>
                <div className="flex-1 text-[var(--color-foreground)]">{o}</div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <span className="material-icons text-[var(--color-muted)] text-2xl mb-2 display-block">show_chart</span>
              <p className="text-sm text-[var(--color-secondary)]">No opportunities identified.</p>
            </div>
          )}
        </div>

        {/* Support Tickets and Signals */}
        <div className="border p-6 bg-[var(--color-background)] col-span-2">
          <div className="space-y-6">
            {/* Support Tickets */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-secondary)] mb-4">
                Support Tickets
              </h3>
              {t.length > 0 ? (
                t.map((tk: any, i: number) => (
                  <div key={i} className="flex items-start space-x-3 py-3 border-b border-[var(--color-muted)] last:border-b-0">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 items-center justify-center rounded-md bg-[var(--color-muted)] text-[var(--color-secondary)] flex">
                        <span className="material-icons text-sm">ticket</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between">
                        <span className="font-medium text-[var(--color-foreground)]">TK-{tk.id}</span>
                        <span className={`px-2 px text-xs rounded-full
                          ${tk.priority === 'High' ? 'bg-[var(--color-error)/20] text-[var(--color-error)]' :
                            tk.priority === 'Medium' ? 'bg-[var(--color-warning)/20] text-[var(--color-warning)]' :
                            'bg-[var(--color-success)/20] text-[var(--color-success)]'}`}>
                          {tk.priority}
                        </span>
                      </div>
                      <p className="text-[var(--color-foreground)]">{tk.issue}</p>
                      <div className="text-xs text-[var(--color-secondary)] flex justify-between">
                        <span>{tk.status}</span>
                        <span>{tk.age}d ago</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <span className="material-icons text-[var(--color-muted)] text-2xl mb-2 display-block">live_help</span>
                  <p className="text-sm text-[var(--color-secondary)]">No support tickets.</p>
                </div>
              )}
            </div>

            {/* Communication Timeline */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-secondary)]">
                  Communication Timeline
                </h3>
                <span className="text-xs text-[var(--color-muted)]">Last 30 days</span>
              </div>
              <div className="space-y-4">
                {/* Combined timeline */}
                {[...s.map(msg => ({...msg, type: 'slack' as const})),
                 ...e.map(mail => ({...mail, type: 'email' as const}))]
                  .sort((a, b) => a.days_ago - b.days_ago)
                  .slice(0, 6) // Show latest 6 items
                  .map((item, index) => {
                    const isSlack = item.type === 'slack';
                    const icon = isSlack ? 'chat_bubble' : 'email';
                    const color = isSlack ? 'var(--color-primary)' : 'var(--color-secondary)';
                    const bgColor = isSlack ? 'var(--color-primary)/10' : 'var(--color-secondary)/10';

                    return (
                      <div key={index} className="flex items-start space-x-3 py-2 border-l-2 pl-4">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className={`h-8 w-8 items-center justify-center rounded-full bg-[${bgColor}] text-[${color}] flex`}>
                            <span className="material-icons text-sm">{icon}</span>
                          </div>
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-[var(--color-foreground)] max-w-[200px] break-words">
                            {isSlack ? item.text : `"${item.subject}"`}
                          </p>
                          <div className="text-xs text-[var(--color-secondary)] flex items-center space-x-2">
                            <span className="material-icons">access_time</span>
                            <span>{item.days_ago}d ago</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {!s.length && !e.length ? (
                  <div className="text-center py-8">
                    <span className="material-icons text-[var(--color-muted)] text-2xl mb-2 display-block">discussion</span>
                    <p className="text-sm text-[var(--color-secondary)]">No recent communications.</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}