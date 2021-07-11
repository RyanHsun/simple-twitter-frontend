import { apiHelper } from './../utils/helpers'

export default {
  logIn ({ email, password }) {
    return apiHelper.post('/users/login', {
      email,
      password
    })
  }
}