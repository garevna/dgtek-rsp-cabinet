import { credentials } from '@/controllers/actions/credentials'

export const auth = (event) => {
  const hash = location.hash.slice(1)
  const refresh = sessionStorage.getItem('refresh')

  if (hash) {
    credentials(hash)
    location.hash = ''
    sessionStorage.setItem('refresh', hash)
  } else {
    if (refresh) {
      credentials(refresh)
    } else {
      window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
        errorType: 'Not authorized',
        errorMessage: 'Access denied'
      })
      setTimeout(() => window.open(window[Symbol.for('portal.entry')], '_self'), 2000)
    }
  }
}
