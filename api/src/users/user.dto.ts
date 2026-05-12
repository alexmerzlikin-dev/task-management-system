export interface CreateUserDto {
  email: string,
  password: string,
  createdAt: Date,
}

export interface ValidateUserDto {
  email: string,
  password: string,

}