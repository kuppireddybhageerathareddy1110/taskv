"use client";

import Link from 'next/link';
import { crm } from '@/lib/mockData';
import { analyze } from '@/lib/mockData';

export default function AccountList() {
  const accounts = crm.map(acc => ({ ...acc, analysis: analyze(acc) }));

  return (
    <div className="w-full border-r border-[var(--color-border)]">
      <div className="px-4 py-2 font-mono text-xs text-[var(--color-secondary)] uppercase tracking-wider">
        Accounts
      </div>
      <div className="space-y-0">
        {accounts.map(acc => {
          const { analysis } = acc;
          const tierClass =
            analysis.tier === 'risk' ? 'bg-[var(--color-error-bg)] text-[var(--color-error)]' :
            analysis.tier === 'watch' ? 'bg-[var(--color-warning-bg)] text-[var(--color-warning)]' :
            'bg-[var(--color-success-bg)] text-[var(--color-success)]';

          const textClass =
            analysis.tier === 'risk' ? 'border-l-4 border-[var(--color-error)]' :
            analysis.tier === 'watch' ? 'border-l-4 border-[var(--color-warning)]' :
            'border-l-4 border-[var(--color-success)]';

          return (
            <Link
              key={acc.id}
              href={`/account/${acc.id}`}
              passHref
              className={`flex items-center justify-between px-4 py-3 cursor-pointer border-b border-[var(--color-border)] hover:bg-[var(--color-muted)] ${textClass} transition-colors duration-200`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[var(--color-foreground)] truncate">{acc.name}</p>
                <p className="text-xs text-[var(--color-secondary)] truncate">{acc.industry} · {acc.plan} plan</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs font-mono ${tierClass}`}>
                {analysis.tier === 'risk' ? 'AT RISK' : analysis.tier === 'watch' ? 'WATCH' : 'HEALTHY'}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}