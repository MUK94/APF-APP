// @ts-nocheck
/* eslint-disable */
const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout'
    });
    if ((res.data.status = 'success'))
      location.reload(true), location.assign('/');
  } catch (error) {
    alert('error', 'Error Logging out! Try again');
  }
};

document.querySelector('.logOut').addEventListener('click', logout);
document.querySelector('.logOutBtn').addEventListener('click', logout);
