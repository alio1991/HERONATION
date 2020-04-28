export const LOGIN_TYPE = [
  {name: 'NONE', className: 'none-background'},
  {name: 'ROLE_EMPRESA', className: 'corporation-background'},
  {name: 'ROLE_DONANTE', className: 'citizen-background'}
];
export const EMAIL_REG = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,'g');