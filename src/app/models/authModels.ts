export type loginData = {
    login: string,
    password: string
}

export type loginOutput = {
    token: string,
    username: string
}

export type userRegister = {
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    birthday: string,
    password: string,
    bio: string
}

export type previousData = {
    token: string,
    username: string
  }

  export type editUser = {
    firstName: string,
    lastName: string,
    birthday: string,
    bio: string
}


