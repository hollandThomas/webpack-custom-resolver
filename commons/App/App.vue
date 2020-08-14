<template>
  <Main>
    <HelloWorld>
      Hello, World!
    </HelloWorld>
  </Main>
</template>

<script>
import styles from './App.styles';

export default {
  name: 'App',
  components: {
    ...styles,
  },
};
</script>
