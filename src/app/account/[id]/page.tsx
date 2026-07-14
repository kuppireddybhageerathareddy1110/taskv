// src/app/account/[id]/page.tsx
import { notFound } from 'next/navigation';
import { crm } from '@/lib/mockData';
import AccountDossier from '@/components/AccountDossier';

export default async function AccountPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const account = crm.find((a) => a.id === id);
  if (!account) {
    notFound();
  }
  return <AccountDossier accountId={id} />;
}