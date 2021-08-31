<template>
  <div class="auth-page ng-scope">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center ng-binding">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}"> Have an account? </router-link>
          </p>

          <list-errors class="ng-isolate-scope"
            ><ul class="error-messages ng-hide">
              <!-- ngRepeat: (field, errors) in $ctrl.errors -->
            </ul>
          </list-errors>

          <validation-errors
            v-if="getFailErrors"
            :validation-errors="getFailErrors"
          />
          <form
            @submit.prevent="onSubmit"
            class="ng-valid ng-valid-email ng-dirty ng-valid-parse"
          >
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="username"
                  class="
                    form-control form-control-lg
                    ng-pristine ng-untouched ng-valid ng-empty
                  "
                  type="text"
                  placeholder="Username"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  v-model="email"
                  class="
                    form-control form-control-lg
                    ng-valid ng-valid-email ng-not-empty ng-dirty ng-touched
                  "
                  type="email"
                  placeholder="Email"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  v-model="password"
                  class="
                    form-control form-control-lg
                    ng-valid ng-not-empty ng-dirty ng-valid-parse ng-touched
                  "
                  type="password"
                  placeholder="Password"
                />
              </fieldset>

              <button
                :disabled="isSubmitting"
                class="btn btn-lg btn-primary pull-xs-right ng-binding"
                type="submit"
              >
                Sign up
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ValidationErrors from "@/components/ValidationErrors";
import {actionTypes} from "@/store/modules/auth";


export default {
  name: 'Register',
  components: {
    ValidationErrors,
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.register, {
          email: this.email,
          username: this.username,
          password: this.password,
        })
        .then((user) => {
          console.log('successfully register user', user);
          //alert('successfully register user')
          this.$router.push({name: 'globalFeed'});
          //window.location.href = 'https://www.google.com'
        });
    },
  },
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting;
    },
    getFailErrors() {
      return this.$store.state.auth.validationErrors;
    },
  },
};
</script>

<style scoped></style>
