# Seller Portal — Deploy to Vercel (like main site)

## Prerequisites
- GitHub repo for seller portal (create one, e.g. `batraverse-seller`).
- Vercel project linked to that repo.
- ngrok tunnel running on the machine (same as main site: `sloping-filled-july.ngrok-free.dev` → port 5000).

## First-time setup
1. Create a GitHub repo and push:
   ```
   cd D:\buiseness\seller.batraverse
   git remote add origin https://github.com/<you>/batraverse-seller.git
   git branch -M main
   git push -u origin main
   ```
2. Import the repo in Vercel → New Project → Framework: Next.js.
3. Set Environment Variables in Vercel (Project → Settings → Environment Variables):
   - `NEXT_PUBLIC_API_URL` = `https://sloping-filled-july.ngrok-free.dev/api`
   - `NEXT_PUBLIC_SITE_URL` = `https://<your-seller>.vercel.app`
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` = your razorpay key
4. Deploy.

## Daily start (local machine)
Run `start-local.bat` (starts Postgres, ML, backend, main site, seller dev) — or start the seller dev server alone:
```
cd D:\buiseness\seller.batraverse
npm run dev -- -p 3001
```
Then start ngrok (same tunnel as main site, port 5000). Vercel auto-deploys on push.

## Sync latest changes
```
cd D:\buiseness\seller.batraverse
git add -A
git commit -m "auto: sync latest changes"
git push origin main
```
Vercel auto-deploys on push.

## Notes
- The backend runs on your machine; Vercel frontend calls it via the ngrok URL.
- If ngrok URL changes, update `NEXT_PUBLIC_API_URL` in Vercel env and redeploy.
- Seller portal uses the same backend API as the main site.