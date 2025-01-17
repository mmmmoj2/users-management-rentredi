import * as Yup from 'yup';

export interface CreateUserRequest {
  name: string;
  zip: string;
}

export interface User {
  id: string;
  name: string;
  zip: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface UpdateUserRequest {
  id: string;
  name?: string;
  zip?: string;
}

export interface ListUsersDto {
  users: User[];
  startAfter?: string;
}

export const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  zip: Yup.string()
    .min(5, 'Invalid zip code!')
    .max(100, 'Invalid zip code!')
    .required('Required'),
});
