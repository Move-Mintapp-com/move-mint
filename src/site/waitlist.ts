/* Launch waitlist.

   Posts the address to /api/waitlist, which adds it to the Mailchimp
   audience server-side. The visitor never leaves the page and no Mailchimp
   credential is ever exposed to the browser — see api/waitlist.js.

   VITE_WAITLIST_ENDPOINT can override the path if the list ever moves to a
   different provider; it is not needed for the Mailchimp setup. */

const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT || '/api/waitlist';

export type WaitlistResult = 'ok' | 'invalid' | 'error' | 'unconfigured';

/* Deliberately loose: the only thing worth catching here is an obvious typo.
   Real deliverability is Mailchimp's job. */
export function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export async function joinWaitlist(email: string, source: string): Promise<WaitlistResult> {
  const address = email.trim();
  if (!looksLikeEmail(address)) return 'invalid';

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email: address, source }),
    });

    if (res.ok) return 'ok';
    if (res.status === 503) return 'unconfigured';   // keys not set in Vercel yet
    if (res.status === 422) return 'invalid';        // Mailchimp rejected the address
    return 'error';
  } catch {
    return 'error';
  }
}
