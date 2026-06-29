<template>
    <v-app-bar  app elevation="1" >
      <v-app-bar-title>
        <v-img
          src="@/assets/logo.png"
          alt="Zera Yard Booking"
          max-width="70"
        ></v-img>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <!-- Navigation Links -->
      <v-btn text to="/" variant="text">Home</v-btn>
      <v-btn text to="/about" variant="text">About</v-btn>
      <v-btn text to="/contact" variant="text">Contact</v-btn>
      <v-btn text to="/register" variant="text">Register</v-btn>
    </v-app-bar>
</template>