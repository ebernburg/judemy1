<template>
  <div class="container">
    <div class="row">
      Email:{{ email }}<br>
      Age:{{ age }}<br>
      Name:{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: 'User',
  props: {
    name: String,
    email: String,
    age: Number
  },
};
</script>

<style scoped></style>
