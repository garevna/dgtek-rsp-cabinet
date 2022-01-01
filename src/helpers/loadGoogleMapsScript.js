export const loadGoogleMapsScript = () => new Promise((resolve) => Object.assign(document.body.appendChild(document.createElement('script')), {
  id: 'google-maps-script',
  src: `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_MAPS_KEY}&libraries=geometry,places`,
  onload: resolve.bind(null, true),
  onerror: resolve.bind(null, false)
}))
