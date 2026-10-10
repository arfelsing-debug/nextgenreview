const PUBLIC_HOST_TARGETS = Object.freeze({
  'shareholderreview.adamasadvisors.com': 'https://shareholderreview-staging.onrender.com',
  'adviserreview.adamasadvisors.com': 'https://adviserreview.onrender.com'
});

export function publicHostRedirect(host, originalUrl = '/') {
  const normalisedHost = String(host || '').trim().toLowerCase().split(':')[0];
  const target = PUBLIC_HOST_TARGETS[normalisedHost];
  if (!target) return null;
  const path = String(originalUrl || '/');
  return target + (path.startsWith('/') ? path : '/' + path);
}

export function installPublicHostRouting(app) {
  app.use((req, res, next) => {
    const location = publicHostRedirect(req.hostname || req.get('host'), req.originalUrl);
    if (!location) return next();
    res.redirect(307, location);
  });
}
