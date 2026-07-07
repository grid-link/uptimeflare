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
    'GridLink Services': ['app', 'api', 'ws-gateway', 'agents'],
    'Platform': ['status'],
  },
  // Logo / favicon are referenced from /public; the brand mark is also
  // inlined in components/Header.tsx so it can pick up text color via
  // currentColor (Mantine Image can't do that).
  logo: '/logo.svg',
  favicon: '/favicon.svg',
  // Footer mirrors the GridLink website footer treatment: dark ink panel,
  // logo + wordmark, terse tagline, LinkedIn, copyright. Inline styles
  // because UptimeFlare's footer is rendered via dangerouslySetInnerHTML.
  customFooter: `
    <div style="margin-top:48px;padding:32px 16px;background:#0F0F0F;color:rgba(245,244,241,0.4);border-top:1px solid rgba(255,255,255,0.06);font-family:'Outfit',ui-sans-serif,system-ui,sans-serif;">
      <div style="max-width:960px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <svg viewBox="0 0 374 362" width="18" height="18" aria-hidden="true" style="color:#00E676;flex-shrink:0;">
            <path fill="currentColor" fill-rule="evenodd" d="M 51.5,14.5 C 78.5021,14.3334 105.502,14.5 132.5,15C 190.035,30.7285 220.035,68.5619 222.5,128.5C 239.757,109.044 261.09,97.2107 286.5,93C 312.165,92.5 337.831,92.3334 363.5,92.5C 366.241,162.242 334.241,207.076 267.5,227C 252.247,229.125 236.914,229.958 221.5,229.5C 221.667,258.502 221.5,287.502 221,316.5C 215.716,335.399 203.216,345.566 183.5,347C 182.5,349 181.5,349 180.5,347C 161.541,346.027 149.375,336.527 144,318.5C 143.833,297.159 143.333,275.826 142.5,254.5C 136.881,235.543 124.547,223.876 105.5,219.5C 105.762,220.978 105.429,222.311 104.5,223.5C 93.4541,237.389 80.4541,248.889 65.5,258C 54.8145,259.834 46.4812,256.334 40.5,247.5C 39.52,244.914 39.1866,242.247 39.5,239.5C 31.8261,239.666 24.1594,239.5 16.5,239C 11.8786,237.536 9.87859,234.369 10.5,229.5C 10.2795,225.752 11.6129,222.752 14.5,220.5C 22.1378,219.503 29.8045,219.169 37.5,219.5C 37.5,209.833 37.5,200.167 37.5,190.5C 29.1401,190.831 20.8068,190.498 12.5,189.5C 10.3054,185.035 9.97208,180.368 11.5,175.5C 12.646,174.855 13.646,174.022 14.5,173C 22.5,172.667 30.5,172.333 38.5,172C 39.6997,163.699 44.0331,157.699 51.5,154C 56.8333,153.333 62.1667,153.333 67.5,154C 83.8168,164.651 97.4835,177.984 108.5,194C 132.641,197.264 150.474,209.764 162,231.5C 164.319,237.12 166.319,242.787 168,248.5C 168.167,269.508 168.667,290.508 169.5,311.5C 172.626,320.128 178.626,323.295 187.5,321C 190.81,318.032 193.31,314.532 195,310.5C 195.5,257.501 195.667,204.501 195.5,151.5C 147.715,155.743 108.215,139.743 77,103.5C 58.1126,76.9713 49.6126,47.3046 51.5,14.5 Z M 78.5,40.5 C 94.8367,40.3334 111.17,40.5001 127.5,41C 153.666,46.8184 173.333,61.4851 186.5,85C 192.274,98.1057 195.274,111.939 195.5,126.5C 159.572,129.529 128.905,118.529 103.5,93.5C 89.9745,78.123 81.6412,60.4563 78.5,40.5 Z M 291.5,118.5 C 307.181,118.167 322.848,118.501 338.5,119.5C 327.812,166.851 298.479,194.851 250.5,203.5C 240.856,204.498 231.19,204.832 221.5,204.5C 221.162,172.836 234.162,148.17 260.5,130.5C 270.03,125.457 280.03,121.957 290.5,120C 291.056,119.617 291.389,119.117 291.5,118.5 Z"/>
          </svg>
          <span style="font-family:'Syne','Outfit',sans-serif;font-weight:800;letter-spacing:-0.02em;color:#F5F4F1;font-size:16px;">GRIDLINK</span>
          <span style="color:rgba(255,255,255,0.1);">|</span>
          <span style="font-size:13px;color:rgba(245,244,241,0.3);">Automation software for EV charging.</span>
        </div>
        <div style="display:flex;align-items:center;gap:16px;font-family:'JetBrains Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.18em;color:rgba(245,244,241,0.2);">
          <a href="https://www.linkedin.com/company/gridlinkco" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none;">LinkedIn</a>
          <a href="https://gridlink.co/privacy-policy" style="color:inherit;text-decoration:none;">Privacy</a>
          <span>&copy; ${new Date().getFullYear()} GridLink</span>
        </div>
      </div>
    </div>
  `,
}

const workerConfig: WorkerConfig = {
  // Persist state every cron tick so the "Last updated" timestamp on the
  // status page reflects the real probe time, not the last status change.
  // Default is 3 — which makes the page look stale even though probes are
  // running every minute.
  kvWriteCooldownMinutes: 1,
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
      // Require a marker only a correctly-built SSR app shell emits: the
      // document <title>GridLink CSMS</title>. A 200 alone can't distinguish a
      // healthy shell from a blank/error page, a Cloudflare interstitial, or a
      // broken build serving an empty document — all of which would still be
      // 2xx. This keyword forces the probe to actually receive the rendered
      // shell HTML. (Deliberately NOT a generic word like "GridLink", which
      // appears in error pages/footers too.)
      responseKeyword: 'GridLink CSMS',
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
    {
      id: 'agents',
      name: 'Agents Webhooks (agents.gridlink.co)',
      method: 'GET',
      target: 'https://agents.gridlink.co/webhooks/health',
      tooltip: 'Agents webhook receiver health endpoint',
      statusPageLink: 'https://agents.gridlink.co/webhooks/health',
      expectedCodes: [200],
      // Health endpoint returns {"ok":true}; require it so a 200 from an
      // unrelated/misrouted handler still pages.
      responseKeyword: '"ok":true',
      timeout: 15000,
      checkProxy: 'worker://enam',
      checkProxyFallback: true,
    },
    {
      id: 'status',
      name: 'Status Page (status.gridlink.co)',
      method: 'GET',
      target: 'https://status.gridlink.co',
      tooltip: 'This status page — catches CF/DNS/edge failures on status.gridlink.co itself',
      statusPageLink: 'https://status.gridlink.co',
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
