// @ts-nocheck
/* eslint-disable */
const logout = async () => {
  const res = await axios({
    method: 'GET',
    url: 'http://127.0.0.1:3000/api/v1/users/logout'
  });
  if ((res.data.status = 'success'))
    location.reload(true), location.assign('/');
};

document.querySelector('.logOut').addEventListener('click', logout);
document.querySelector('.logOutBtn').addEventListener('click', logout);
