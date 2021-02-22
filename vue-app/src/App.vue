<template>
  <div id="app">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">ASYS</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <router-link to="/" tag="li" class="nav-item">
              <!-- <a href="#" class="nav-link">Home</a> -->
            </router-link>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a class="navbar-right">{{userType}}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class App extends Vue {
  private userType: any = '';

  // @Watch('userType')
  // onPropertyChanged(value: any, oldValue: any) {
  //   console.log(value, oldValue);
  // }

  mounted(){
    this.userType = localStorage.userType;
  }
}
</script>