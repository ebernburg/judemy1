<template>
  <ul>
    <li v-for="error in errorMessages" :key="error" class="error-messages">
      <h6 style="color: red">{{ error }}</h6>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ValidationErrors',
  props: {
    validationErrors: {
      type: Object,
      require: true,
    },
  },
  computed: {
    errorMessages() {
     // console.log('errors', this.validationErrors);
      return Object.keys(this.validationErrors).map(name=>{
        const messages = this.validationErrors[name].join(', ');
        return `${name} ${messages}`;
      });


    },
  },
};
</script>

<style scoped></style>
