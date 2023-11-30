export interface User {
  id: string,
  email: string,
  password: string,
  name: string,
  avatar: string
}

export type CreateUserDTO = Omit<User, 'id'>

