import axios from "axios";

export const authServer = {
    token: JSON.parse(localStorage.getItem('token')),
    isLogin: false,

    async signIn(username, password) {
        const response = await axios.post('https://emphasoft-test-assignment.herokuapp.com/api-token-auth/', {
            username: username,
            password: password
        });
        this.token = response.data.token
        localStorage.setItem('token', JSON.stringify(this.token));
        this.isLogin = true;
    },

    signOut() {
        this.isLogin = false;
        this.token = null
    },
}