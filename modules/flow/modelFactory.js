import { User }  from './model'
function parseDataToModel (data ?: Object): User {
  const user: User = {
    id: 0,
    username: ''
  }
  if (data != null) {
    user.id = data.id
    user.username = data.username
  }
  return user
}