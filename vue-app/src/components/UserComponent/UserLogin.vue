<template>
    <div class="raw">
        <div class="center-block">
            <button type="button" class="btn btn-success" @click="login('SUPPLIER')">
              Supplier Login
            </button>
            <button type="button" id="user2" class="btn btn-success" @click="login('REVIEWER')">Reviewer Login</button>
            <button type="button" id="user3" class="btn btn-success" @click="login('CARRIER')">Carrier Login</button>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class UserLogin extends Vue {
  private xname: any;
  login(userType: string) {
    localStorage.userType = userType;
    this.xname = prompt('Enter your name.');
    switch(userType) {
      case 'CARRIER':
        this.$socket.emit('adduser',{username: this.xname, userType: userType});
        this.$router.push({name: 'orders'});
        break;
      case 'REVIEWER':  
        this.$socket.emit('adduser',{username: this.xname, userType: userType});
        this.$router.push({name: 'requests'});
        break;
      default:
        this.$socket.emit('adduser',{username: this.xname, userType: userType});
        this.$router.push({name: 'assets'});    
    }
  }

//   mounted() {
//   }
}
</script>

<style scoped>
.edit-form {
  max-width: 720px;
  margin: auto;
}
</style>