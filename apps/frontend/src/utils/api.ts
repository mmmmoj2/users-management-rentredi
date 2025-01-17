import ax from 'axios';

export const API = {
  baseUrl: '/api',
  users: 'users',
  userDetails: (id: string) => `${API.users}/${id}`,
};

const instance = ax.create({
  baseURL: API.baseUrl,
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

export const axios = instance;
