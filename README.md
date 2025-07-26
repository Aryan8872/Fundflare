# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Stripe Webhook Integration Troubleshooting

If you are using the Stripe CLI to test webhooks locally, make sure you are forwarding events to the correct endpoint. By default, the backend mounts all routes under `/api`, so your webhook endpoint is:

```
http://localhost:5000/api/webhooks/stripe
```

**NOT**
```
http://localhost:5000/webhooks/stripe
```

### How to Listen for Webhooks with Stripe CLI

Run this command in your terminal:

```
stripe listen --forward-to localhost:5000/api/webhooks/stripe
```

This will ensure Stripe events are delivered to your backend correctly.

### Common Issues
- If you see `[404] POST http://localhost:5000/webhooks/stripe` in your Stripe CLI output, you are using the wrong endpoint. Update your command as above.
- Make sure your backend is running and listening on port 5000.
- Ensure your `.env` file contains the correct `STRIPE_WEBHOOK_SECRET` and restart your backend after editing it.
