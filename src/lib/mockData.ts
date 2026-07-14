// src/lib/mockData.ts
export interface Ticket {
  id: string;
  priority: 'High' | 'Medium' | 'Low';
  issue: string;
  status: 'Open' | 'Resolved';
  age: number; // days
}

export interface SlackMessage {
  channel: string;
  text: string;
  days_ago: number;
}

export interface Email {
  subject: string;
  snippet: string;
  days_ago: number;
  replied: boolean;
}

export interface CRMAccount {
  id: string;
  name: string;
  arr: number;
  industry: string;
  owner: string;
  renewal: string; // YYYY-MM-DD
  plan: string;
}

export interface Analysis {
  score: number;
  tier: 'risk' | 'watch' | 'healthy';
  risks: string[];
  opps: string[];
  nba: string;
  why: string;
  daysToRenewal: number;
  unreplied: Email[];
}

// Dummy data copied from customer360.html
export const crm: CRMAccount[] = [
  {id:"acme", name:"Acme Logistics", arr:184000, industry:"Logistics", owner:"R. Nair", renewal:"2026-08-02", plan:"Growth"},
  {id:"bluepeak", name:"BluePeak Retail", arr:96000, industry:"Retail", owner:"S. Iyer", renewal:"2026-09-14", plan:"Standard"},
  {id:"forma", name:"Forma Health", arr:312000, industry:"Healthcare", owner:"R. Nair", renewal:"2026-07-30", plan:"Enterprise"},
  {id:"kestrel", name:"Kestrel Manufacturing", arr:58000, industry:"Manufacturing", owner:"A. Verma", renewal:"2027-01-10", plan:"Standard"},
  {id:"nimbus", name:"Nimbus Cloud Co", arr:145000, industry:"SaaS", owner:"S. Iyer", renewal:"2026-08-20", plan:"Growth"},
];

export const tickets: Record<string, Ticket[]> = {
  acme:   [{id:"T-2291",priority:"High",issue:"Card decline on bulk vendor payout",status:"Open",age:6},
           {id:"T-2244",priority:"Medium",issue:"Approval workflow confusion (new hire)",status:"Resolved",age:14}],
  bluepeak:[{id:"T-1180",priority:"Low",issue:"Export format question",status:"Resolved",age:20}],
  forma:  [{id:"T-3310",priority:"High",issue:"SSO login failure for finance team",status:"Open",age:3},
           {id:"T-3298",priority:"High",issue:"Reimbursement policy rules not syncing",status:"Open",age:9},
           {id:"T-3280",priority:"Medium",issue:"Card limit increase request",status:"Resolved",age:11}],
  kestrel:[],
  nimbus: [{id:"T-2701",priority:"Medium",issue:"Slack notifications not firing",status:"Open",age:4}],
};

export const slack: Record<string, SlackMessage[]> = {
  acme:   [{channel:"#cs-acme", text:"customer said this is blocking Friday payroll, needs escalation", days_ago:1},
           {channel:"#cs-acme", text:"champion (finance lead) mentioned they're evaluating a competitor for AP", days_ago:5}],
  bluepeak:[{channel:"#cs-bluepeak", text:"quiet quarter, no complaints, expansion conversation went well", days_ago:10}],
  forma:  [{channel:"#cs-forma", text:"CFO said reliability has been 'a real problem lately', wants a call", days_ago:2},
           {channel:"#cs-forma", text:"IT lead asked about enterprise SSO SLA in writing", days_ago:2}],
  kestrel:[{channel:"#cs-kestrel", text:"champion moved teams internally, new contact not yet identified", days_ago:18}],
  nimbus: [{channel:"#cs-nimbus", text:"asked about adding 40 more seats next quarter", days_ago:6}],
};

export const emails: Record<string, Email[]> = {
  acme:   [{subject:"Re: Payout failure", snippet:"This is the second time this month — need resolution before Friday.", days_ago:1, replied:false}],
  bluepeak:[{subject:"Q3 check-in", snippet:"Happy to jump on a call about the multi-store rollout.", days_ago:3, replied:true}],
  forma:  [{subject:"SSO outage — escalation", snippet:"Our security team is asking questions. Please advise urgently.", days_ago:2, replied:false},
           {subject:"Renewal terms", snippet:"Can we discuss renewal pricing before end of month?", days_ago:9, replied:true}],
  kestrel:[{subject:"Any update?", snippet:"Following up — haven't heard back in a while.", days_ago:12, replied:false}],
  nimbus: [{subject:"Seat expansion", snippet:"Loved the onboarding, want to scale usage across two more teams.", days_ago:6, replied:true}],
};

// Analysis function (same as in HTML)
export function analyze(acct: CRMAccount): Analysis {
  const t = tickets[acct.id] || [];
  const s = slack[acct.id] || [];
  const e = emails[acct.id] || [];

  let score = 82;
  const risks: string[] = [];
  const opps: string[] = [];

  const openHigh = t.filter(x=>x.status==="Open" && x.priority==="High").length;
  if(openHigh>0){ score -= openHigh*12; risks.push(`${openHigh} unresolved high-priority ticket(s) open right now`); }

  const unreplied = e.filter(x=>!x.replied);
  unreplied.forEach(m=>{ if(m.days_ago>=2){ score-=8; risks.push(`No reply sent to "${m.subject}" in ${m.days_ago} day(s)`);} });

  const daysToRenewal = Math.round((new Date(acct.renewal).getTime() - new Date("2026-07-14").getTime())/86400000);
  if(daysToRenewal <= 21){ score-=10; risks.push(`Renewal in ${daysToRenewal} day(s) — inside standard risk window`); }

  s.forEach(m=>{
    if(/competitor|evaluating/i.test(m.text)){ score-=15; risks.push("Slack signal: champion mentioned evaluating a competitor"); }
    if(/problem|urgent|escalat/i.test(m.text)){ score-=10; risks.push("Slack signal: leadership raised reliability/urgency concern"); }
    if(/champion.*moved|new contact/i.test(m.text)){ score-=14; risks.push("Champion changed roles — no confirmed new contact"); }
    if(/expansion|more seats|scale/i.test(m.text)){ score+=6; opps.push("Slack signal: active interest in expanding seats/usage"); }
  });

  e.forEach(m=>{
    if(/renewal pricing|renewal terms/i.test(m.snippet)){ opps.push("Customer proactively opened renewal pricing conversation"); }
    if(/multi-store|rollout|scale/i.test(m.snippet)){ opps.push("Customer signaled interest in multi-site / expanded rollout"); }
  });

  if(risks.length===0) opps.push("No active risk signals — good candidate for a proactive expansion conversation");
  score = Math.max(5, Math.min(98, Math.round(score)));

  let tier: 'risk' | 'watch' | 'healthy' = 'healthy';
  if(score < 50) tier = "risk"; else if(score < 70) tier = "watch";

  // Next Best Action logic
  let nba: string, why: string;
  if(tier==="risk" && openHigh>0){
    const highTicket = t.find(x=>x.status==="Open"&&x.priority==="High");
    nba = `Escalate ${highTicket?.id ?? ''} internally and have the account owner personally confirm resolution ETA today.`;
    why = "Open high-priority ticket + unanswered email + tight renewal window compound into real churn risk if not addressed within 48h.";
  } else if(tier==="risk"){
    nba = `${acct.owner} to book a direct call with the champion within 3 business days.`;
    why = "Multiple negative signals across channels — a call surfaces context that tickets and email threads won't.";
  } else if(opps.some(o=>/expand|expansion|rollout|seats/i.test(o))){
    nba = `${acct.owner} to send an expansion proposal (seats/rollout) referencing the specific interest shown in Slack/email.`;
    why = "Account is stable and has explicitly signaled growth interest — timing is right, don't let it go cold.";
  } else {
    nba = `Standard quarterly check-in — no urgent action needed.`;
    why = "No unresolved risk signals and no explicit expansion interest yet.";
  }

  return {score, tier, risks, opps, nba, why, daysToRenewal, unreplied};
}