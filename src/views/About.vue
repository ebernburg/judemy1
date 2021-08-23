<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Text
      title="hi, from titel.test"
      text="hi from text.test"
      is-published="false"
    >
    </Text>

    <User :name="user.name" :age="user.age" :email="user.email" />
  </div>
</template>

<script>
import Text from '@/components/Test.vue';
import User from '@/components/User.vue';

export default {
  name: 'About',
  data() {
    return {
    user: {
      name: 'andrii',
      age: 41,
      email: 'andrii@q.a',
    },
    api: null,
  }
},

  components: {
    Text,
    User,
  },
};
</script>
