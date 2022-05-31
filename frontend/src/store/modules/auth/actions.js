

import Axios from "../../../_services/axios"
import AuthService from "@/_services/authService";


export default {
    /******************  login, register et déconnection************************** */
    login({ commit }, user) {
        return AuthService.login(user).then(
            user => {
                commit('loginSuccess', user);
                return Promise.resolve(user);
            },
            error => {
                commit('loginFailure');
                return Promise.reject(error);
            }
        );
    },
    logOut({ commit }) {
        commit("LOG_OUT");
    },
    register({ commit }, user) {
        return AuthService.register(user).then(
            response => {
                commit('registerSuccess');
                return Promise.resolve(response.data);
            },
            error => {
                commit('registerFailure');
                return Promise.reject(error);
            }
        );
    },

    /******************** enregistrement et récupération  du token et de l'user******************************** */
    setToken({ commit }, token) {
        commit("SET_TOKEN", token);
    },
    setUser({ commit }, user) {
        commit("SET_USER", user);
    },
    getUserById({ commit }) {
        let id = this.state.user.id;
        Auth.getUserById(id).then((response) => {
            const user = response.data;
            commit("GET_USER_BY_ID", user);
        });
    },
    /* deleteToken({ commit }, token) {
        commit("DELETE_TOKEN", token);
    },*/


    /* getUsers({ commit }) {
         Auth.getUsers().then((response) => {
             const users = response.data;
             commit("GET_USERS", users);
         });
     },
    
     deleteAccount({ commit }, id) {
         Auth.deleteAccount(id).then(() => {
             commit("DELETE_ACCOUNT", id);
         })
     },*/
};