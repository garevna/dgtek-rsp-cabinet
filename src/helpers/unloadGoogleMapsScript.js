export const unloadGoogleMapsScript = () => Array.from(document.getElementsByTagName('script'))
  .filter(script => script.src.indexOf('https://maps.googleapis.com') !== -1)
  .forEach(script => {
    script.remove()
  })
