/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Waitlist form endpoint. Set in Vercel → Settings → Environment Variables. */
  readonly VITE_WAITLIST_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
