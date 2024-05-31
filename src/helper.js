import axios from "axios";

const API_URL = "http://167.114.113.203:5555";

const getUserInfo = async () => {
    if (!localStorage.getItem("Token")) {
        return null;
    }

    try {
        const response = await axios.get(`${API_URL}/Users/me`, {
            headers: {
                authorization: localStorage.getItem("Token"),
            },
        });

        if (!response.data.success) {
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
        let response;
        if (method.toLowerCase() === "delete") {
            response = await axios.delete(`${API_URL}/${url}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("Token"),
                },
            });

            return response.data;
        }
        else if (method.toLowerCase() === "put") {
            response = await axios.put(`${API_URL}/${url}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("Token"),
                },
            });
        } else if (method.toLowerCase() === "get") {
            response = await axios.get(`${API_URL}/${url}`, {
                headers: {
                    Authorization: localStorage.getItem("Token"),
                },
            });
        } else {
            response = await axios[method.toLowerCase()](`${API_URL}/${url}`, data, {
                headers: {
                    Authorization: localStorage.getItem("Token"),
                },
            });
        }
        

        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }

        return { succes: false, error: "Network error" };
    }
}


export { getUserInfo, login, APIRequest, API_URL};