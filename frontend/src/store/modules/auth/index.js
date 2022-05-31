import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

const defaultUser = {
    userId: -1,
    token: ''
}

let user = localStorage.getItem('user');

// Si l'utilisateur n'est pas dans le local storage, l'utilisateur est par défaut
    // Sinon récupérer l'utilisateur du local storage
if (!user) {
    user = defaultUser;
} else {
    try {
        user = JSON.parse(user);
        Axios.defaults.headers['Authorization'] = `Bearer ${user.token}`;
    } catch(exception) {
        user = defaultUser;
    }
}


export default {
 
    state() {
        return {
            name: ' à Groupomania',
            namespaced: true,
          
            token: null,
            user: {},
            isLoggedIn: false,
            isLoading: false,

            posts: [],
            users: [],
            post: {},
            message: '',
            error: '',

        };


    },
    mutations,
    getters,
    actions,
};