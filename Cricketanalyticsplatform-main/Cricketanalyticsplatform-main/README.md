
  # crivora

  This is the code bundle for `crivora`, a cricket analytics experience adapted from the original design source at https://www.figma.com/design/KthQlfmKf2u62qriIA0Jhy/Premium-Cricket-Analytics-Platform.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  Run `npm run build` to generate the production frontend build.

  Run `npm run build:pages` to generate the GitHub Pages build for the `Cricketanalyticsplatform` repository path.

  The frontend now uses `/api` by default. In local development, Vite proxies `/api` to `http://127.0.0.1:3003`.

  For production deployments with a separately hosted backend, set `VITE_API_BASE` to your deployed backend URL ending in `/api`.

  On GitHub Pages, the frontend automatically falls back to bundled mock data when no live backend is available.
  
