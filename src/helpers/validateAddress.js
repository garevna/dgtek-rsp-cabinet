export default (address) => {
  if (!window.google.maps) {
    console.warn('App is not ready to perform this action')
    return
  }
  const geocode = (new window.google.maps.Geocoder()).geocode
  return new Promise(function (resolve, reject) {
    geocode({ address }, function (results, status) {
      this.ready = status === 'OK'
      if (status === 'OK') {
        const latLng = results[0].geometry.location
        const [number, street, city, state, admin, postCode] = [
          'street_number',
          'route',
          'locality',
          'administrative_area_level_1',
          'administrative_area_level_2',
          'postal_code'
        ].map(name => results[0].address_components.find(item => item.types[0] === name))
          .map(item => item ? item.short_name : '')

        resolve({
          formattedAddress: results[0].formatted_address,
          formattedCoordinates: [latLng.lng(), latLng.lat()],
          location: latLng,
          properties: {
            number,
            street,
            city,
            state,
            admin,
            postCode
          }
        })
      } else reject(status)
    })
  })
}
