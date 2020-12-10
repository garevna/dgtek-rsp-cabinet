export default function () {
  return new Promise((resolve) => {
    const script = document.body.appendChild(document.createElement('script'))
    script.src = `${process.env.VUE_APP_API_URL_GOOGLE}/maps/api/js?key=${process.env.VUE_APP_GOOGLE_MAPS_KEY}&libraries=geometry,drawing,places`
    script.onload = resolve.bind(null, true)
    script.onerror = resolve.bind(null, false)
  })
}
