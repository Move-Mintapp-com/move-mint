
  # Move - Mint App

  This is a code bundle for Move - Mint App. The original project is available at https://www.figma.com/design/q0Da82OR3TBG9QvLNvxzCK/Move---Mint-App--Copy---Copy---Copy-.

  ## Prerequisites

  **Node.js Requirements:**
  - Node.js 20.19.0+ or 22.12.0+ is required
  - npm 9.0.0+ is required

  ### Upgrading Node.js

  If you're using nvm (Node Version Manager):
  ```bash
  nvm install 22.12.0
  nvm use
  ```

  Or download directly from [Node.js official website](https://nodejs.org/)

  ## Tech Stack

  - **React 19.2.0** - Latest React with modern features
  - **Vite 7.1.12** - Fast build tool and dev server
  - **TypeScript 5.7.3** - Type safety
  - **Tailwind CSS v4** - Utility-first CSS framework
  - **Radix UI** - Accessible component primitives
  - **Lucide React** - Icon library

  ## Running the code

  1. Install dependencies:
     ```bash
     npm install
     ```

  2. Start the development server:
     ```bash
     npm run dev
     ```

  3. Build for production:
     ```bash
     npm run build
     ```

  ## Recent Updates (2025-10-26)

  The codebase has been updated to use the latest versions:
  - React 18 → React 19
  - Vite 6 → Vite 7
  - Updated all Context.Provider patterns to React 19's simplified Context syntax
  - Added TypeScript configuration
  - Updated all dependencies to latest stable versions

## Launch waitlist

The **Get the app** page posts to `/api/waitlist`, a Vercel serverless
function that adds the address to the Mailchimp audience. It runs
server-side so the API key is never exposed to the browser — Mailchimp
also refuses requests made directly from a web page.

Set these in **Vercel → Settings → Environment Variables**, with the
**Production** environment ticked:

| Variable | Where to find it |
| --- | --- |
| `MAILCHIMP_API_KEY` | Mailchimp → Account → Extras → API keys. Must keep its data-centre suffix, e.g. `…-us14`. |
| `MAILCHIMP_AUDIENCE_ID` | Mailchimp → Audience → Settings → Audience name and defaults. `MAILCHIMP_LIST_ID` also works. |
| `MAILCHIMP_STATUS` | Optional. `subscribed` (default) or `pending` for double opt-in. |

**Environment variables are captured when a deployment is built.** Adding
or editing one does not affect the deployment already running — redeploy
afterwards, or push a commit.

To check what production can actually see:

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}' \
  https://move-mintapp.com/api/waitlist
```

| Response | Meaning |
| --- | --- |
| `{"ok":true}` | Working. The address is in the audience. |
| `{"error":"unconfigured","missing":[…]}` | Those variables are not reaching Production. |
| `{"error":"malformed_key"}` | The key lost its `-us14` suffix. |
| `{"error":"rejected"}` | Mailchimp refused that address. |
