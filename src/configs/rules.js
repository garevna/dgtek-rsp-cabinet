import { patterns, validateABN } from './'

export const rules = {
  required: value => !!value || 'Required.',
  'simple-text': value => true,
  number: value => value ? patterns.number.test(value) || 'Invalid number.' : true,
  mobile: value => value ? patterns.mobile.test(value) || 'Invalid mobile phone number.' : true,
  phone: value => value ? patterns.phone.test(value) || 'Invalid phone number.' : true,
  email: value => value ? patterns.email.test(value) || 'Invalid e-mail.' : true,
  state: value => value ? patterns.state.indexOf(value) !== -1 || 'Invalid state.' : true,
  postcode: value => value ? patterns.postcode.test(value) || 'Invalid state.' : true,
  abn: value => value ? validateABN(value) || 'Invalid ABN.' : 'Required',
  url: value => value ? patterns.url.test(value) || 'Invalid URL.' : true,
  login: value => value.length > 5 || 'Invalid login',
  password: value => patterns.password.test(value) || 'Password is not strong enough.'
}
