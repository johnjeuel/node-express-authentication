/**
 * @Todo add password
 */

export interface IUser {
  _id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  role: string;
}

export interface IUserInputDTO {
  username: string;
  password: string;
  name: string;
  email: string;
  role: string;
}
