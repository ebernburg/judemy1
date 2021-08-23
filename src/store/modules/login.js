import login from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

export const mutationTypes = {
  loginStart: '[login] loginStart',
  loginSuccess: '[login] loginSuccess',
  loginFailure: '[login] loginFailure',
};

export const actionTypes = {
  login: '[login] login',
};

const mutations = {
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
    state.validationErrors = null;
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

const actions = {
  [actionTypes.login](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.loginStart);
      login
        .login(credentials)
        .then((response) => {
          console.log('response', response);
          context.commit(mutationTypes.loginSuccess, response.data.user);
          // window.localStorage.setItem('accessToken', response.data.user.token);
          setItem('accessToken', response.data.user.token);

          resolve(response.data.user);
        })
        .catch((result) => {
          console.log('error', result);
          context.commit(
            mutationTypes.loginFailure,
            result.response.data.errors
          );
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
