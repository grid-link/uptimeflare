// GridLink status page config — replaces the Uptime Kuma deployment.
// Public, hosted at https://status.gridlink.co.

import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  title: 'GridLink Status',
  links: [
    { link: 'https://gridlink.co', label: 'Website' },
    { link: 'https://app.gridlink.co', label: 'App', highlight: true },
  ],
  group: {
    'GridLink Services': ['app', 'api', 'website', 'ws-gateway'],
  },
}

const workerConfig: WorkerConfig = {
  monitors: [
    // All probes pin to Eastern North America via a Durable Object
    // location hint — production runs on Fly.io in iad (Ashburn, VA), so
    // this gives a consistent, geographically realistic vantage point
    // instead of whichever colo Cloudflare happens to schedule the cron in
    // (which is what was producing the Singapore/SE Asia probes the user
    // saw on the latency-chart hover).
    {
      id: 'app',
      name: 'App (app.gridlink.co)',
      method: 'GET',
      target: 'https://app.gridlink.co',
      tooltip: 'GridLink web app — front door',
      statusPageLink: 'https://app.gridlink.co',
      // Unauthenticated GET to / returns 307 → /api/auth/login. That IS the
      // healthy state for an unauthenticated probe.
      expectedCodes: [200, 307, 308],
      timeout: 15000,
      checkProxy: 'worker://enam',
      checkProxyFallback: true,
    },
    {
      id: 'api',
      name: 'API (api.gridlink.co)',
      method: 'GET',
      target: 'https://api.gridlink.co/health',
      tooltip: 'Backend API health endpoint',
      statusPageLink: 'https://api.gridlink.co/health',
      expectedCodes: [200],
      // Require literal "status":"ok" so a degraded JSON response (state != healthy)
      // still pages even though the HTTP status is 200.
      responseKeyword: '"status":"ok"',
      timeout: 15000,
      checkProxy: 'worker://enam',
      checkProxyFallback: true,
    },
    {
      id: 'website',
      name: 'Website (www.gridlink.co)',
      method: 'GET',
      target: 'https://www.gridlink.co',
      tooltip: 'Marketing site',
      statusPageLink: 'https://www.gridlink.co',
      expectedCodes: [200],
      timeout: 15000,
      checkProxy: 'worker://enam',
      checkProxyFallback: true,
    },
    {
      id: 'ws-gateway',
      name: 'OCPP WS Gateway',
      method: 'GET',
      target: 'https://gridlink-ws-gateway.fly.dev/health',
      tooltip: 'OCPP WebSocket gateway health endpoint',
      expectedCodes: [200],
      timeout: 15000,
      checkProxy: 'worker://enam',
      checkProxyFallback: true,
    },
  ],
  notification: {
    webhook: {
      // Resolved at runtime from the SLACK_WEBHOOK_URL Worker secret.
      // Kept out of source so the repo can stay public without leaking the
      // webhook (anyone with the URL can post to #alerts-prod).
      url: 'env:SLACK_WEBHOOK_URL',
      method: 'POST',
      payloadType: 'json',
      payload: {
        text: '$MSG',
      },
      timeout: 10000,
    },
    timeZone: 'America/Chicago',
    // Two consecutive failures before paging — kills the single-probe-blip
    // false positives that plagued Kuma (which had maxretries=0).
    gracePeriod: 2,
    skipErrorChangeNotification: true,
  },
}

const maintenances: MaintenanceConfig[] = []

export { maintenances, pageConfig, workerConfig }
