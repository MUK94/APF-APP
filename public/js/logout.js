// @ts-nocheck
/* eslint-disable */
const logout = async () => {
  const res = await axios({
    method: 'GET',
    url: '/api/v1/users/logout'
  });
  if ((res.data.status = 'success'))
    location.reload(true), location.assign('/');
};

document.querySelector('.logOut').addEventListener('click', logout);
document.querySelector('.logOutBtn').addEventListener('click', logout);
