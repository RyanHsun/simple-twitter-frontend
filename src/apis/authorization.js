import { apiHelper } from './../utils/helpers'

export default {
  logIn ({ email, password }) {
    return apiHelper.post('/users/login', {
      email,
      password
    })
  },
  regist ({ account, name, email, password, checkPassword }) {
    return apiHelper.post('/users', {
      account, name, email, password, checkPassword
    })
  }
}
