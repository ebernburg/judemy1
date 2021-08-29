import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

const state = {
  isSubmitting: false,
  currentUser: null,
  isLoading: false,
  validationErrors: null,
  isLoggedIn: null,
};

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure',
};

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
};

const getters = {
  currentUser: (state) => {
    return state.currentUser;
  },
  isLoggedIn: (state) => {
    return Boolean(state.isLoggedIn);
  },
  isAnonymous: (state) => {
    return state.isLoggedIn === false;
  },
};

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
    state.validationErrors = null;
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

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

  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.currentUser = payload;
    state.isLoggedIn = true;
    state.isLoading = false;
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
  },
};

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.registerStart);
      authApi
        .register(credentials)
        .then((response) => {
          console.log('response', response);
          context.commit(mutationTypes.registerSuccess, response.data.user);
          // window.localStorage.setItem('accessToken', response.data.user.token);
          setItem('accessToken', response.data.user.token);

          resolve(response.data.user);
        })
        .catch((result) => {
          console.log('error', result);
          context.commit(
            mutationTypes.registerFailure,
            result.response.data.errors
          );
        });
    });
  },

  [actionTypes.login](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.loginStart);
      authApi
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

  [actionTypes.getCurrentUser](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCurrentUserStart);
      authApi
        .getCurrentUser()
        .then((response) => {
          context.commit(
            mutationTypes.getCurrentUserSuccess,
            response.data.user
          );
          // window.localStorage.setItem('accessToken', response.data.user.token);
          //setItem('accessToken', response.data.user.token);

          resolve(response.data.user);
        })
        .catch(() => {
          context.commit(
            mutationTypes.getCurrentUserFailure,
          );
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
