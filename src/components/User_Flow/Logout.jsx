
const Logout = () => {
    localStorage.removeItem('Token');
    window.location.href = '/login';
};

export default Logout;