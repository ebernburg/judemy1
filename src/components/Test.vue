<template>
  hallo
  <h2>{{title}}</h2>
  <h2>{{text}}</h2>
  <h2>{{isPublished}}</h2>


</template>

<script>
export default {
  name: "Test",

  props: {
    text: String,
    title: String,
    isPublished: Boolean,
    todo: []
  }
};
</script>

<style scoped></style>
