/* Launch waitlist.

   Posts the address straight to a form/mailing-list endpoint so the visitor
   never leaves the page and never opens an email app. The endpoint lives in
   the VITE_WAITLIST_ENDPOINT environment variable (set it in Vercel →
   Settings → Environment Variables, then redeploy) so the address list is
   owned by whichever service Move-Mint signs up to, not hard-coded here.

   Works as-is with any service that accepts a JSON POST and answers 2xx —
   Formspree, Getform, Formcarry, Web3Forms, a Google Apps Script webhook,
   or a Mailchimp/Beehiiv proxy. */

const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT;

export type WaitlistResult = 'ok' | 'invalid' | 'error' | 'unconfigured';

/* Deliberately loose: the only thing worth rejecting here is an obvious
   typo. Real deliverability is the mailing-list provider's job. */
export function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export async function joinWaitlist(email: string, source: string): Promise<WaitlistResult> {
  const address = email.trim();
  if (!looksLikeEmail(address)) return 'invalid';
  if (!ENDPOINT) return 'unconfigured';

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        email: address,
        source,
        submittedAt: new Date().toISOString(),
      }),
    });
    return res.ok ? 'ok' : 'error';
  } catch {
    return 'error';
  }
}
