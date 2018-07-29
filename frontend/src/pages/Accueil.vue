<!-- Page d'accueil -->
<template>
  <default-layout>
    <h1>Welcom to SupFight</h1>
    <div id="forms">
      <login-form id="login"/>
      <signin-form id="signin"/>
    </div>
  </default-layout>
</template>

<script>
import defaultLayout from '@/layout/defaultLayout'
import LoginForm from '@/components/form/Login'
import SignInForm from '@/components/form/SignIn'

export default {
  components: {
    'default-layout': defaultLayout,
    'login-form': LoginForm,
    'signin-form': SignInForm
  }
}
</script>

<style scoped>
#forms{
  display: grid;
  grid-template-areas: "login signin";
}

#form #login{
  grid-area: login;
}

#form #signin{
  grid-area: signin;
}
</style>
