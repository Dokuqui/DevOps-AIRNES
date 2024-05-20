import axios from "axios";

const API_URL = "http://localhost:667";

const getUserInfo = async () => {
    if (!localStorage.getItem("token")) {
        return null;
    }

    try {
        const response = await axios.get(`${API_URL}/Users/me`, {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        });

        if (!response.data.succes) {
            return null;
        }

        response.data.return.FirstName = response.data.return.FirstName.charAt(0).toUpperCase() + response.data.return.FirstName.slice(1).toLowerCase();
        response.data.return.LastName = response.data.return.LastName.charAt(0).toUpperCase() + response.data.return.LastName.slice(1).toLowerCase();
        return response.data.return;
    } catch (error) {
        return null;
    }
}

const login = async (email, password) => {
    try {
        // Return even if the response is 404
        
        const response = await axios.post(`${API_URL}/Users/login`, {
            Mail: email,
            Password: password,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const APIRequest = async (method, url, data) => {
    try {
        const response = await axios[method.toLowerCase()](`${API_URL}/${url}`, data, {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }

        return { succes: false, error: "Network error" };
    }
}


export { getUserInfo, login, APIRequest };