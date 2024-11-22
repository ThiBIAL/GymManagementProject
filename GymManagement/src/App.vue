<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/BookCourse">BookCourse</router-link>
      <router-link to="/SignIn">SignIn</router-link>
      <router-link to="/SignUp">SignUp</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>


<style>
nav {
  display: flex;
  gap: 20px;
  padding: 10px;
  justify-content: center;
}

a{
  text-decoration: none;
  color: black;
}
</style>