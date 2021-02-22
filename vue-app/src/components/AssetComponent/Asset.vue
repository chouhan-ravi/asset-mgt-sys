<template>
  <div v-if="currentAsset" class="edit-form">
    <h4>Asset Request</h4>
    <router-link to="/assets" tag="span" class="nav-item">
      <a href="#" class="nav-link">Back to list</a>
    </router-link>
    <form>
      <div class="form-group">
        <label for="assetId">Asset Id</label>
        <input
          type="text"
          class="form-control"
          id="assetId"
          v-model="currentAsset.id"
          readonly="true"
        />
      </div>

      <div class="form-group">
        <label for="type">Asset Type</label>
        <select
          class="form-control"
          id="type"
          v-model="currentAsset.type"
        >
          <option value=""> - Select - </option>
          <option value="goods">Goods</option>
          <option value="pallet">Pallets</option>
        </select>
      </div>

      <div class="form-group">
        <label for="quantity">Quantity</label>
        <input
          type="number"
          class="form-control"
          id="quantity"
          v-model="currentAsset.quantity"
        />
      </div>

      <div class="form-group">
        <label for="timestamp">Date & Time</label>
        <input
          type="date"
          class="form-control"
          id="timestamp"
          v-model="currentAsset.timestamp"
        />
      </div>

      <div class="form-group">
        <label for="note">Note</label>
        <input
          type="text"
          class="form-control"
          id="note"
          v-model="currentAsset.note"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentAsset.status }}
      </div>
    </form>

    <button
      class="btn btn-primary mr-2"
      v-if="currentAsset.status == 1"
      @click="updateStatus(2)"
    >
      Sent To Review
    </button>
    <!-- <button
      v-if="currentAsset.status == 2"
      class="btn btn-primary mr-2"
      @click="updateStatus(1, currentAsset.id)"
    >
      Review Revoke
    </button> -->

    <button class="btn btn-danger mr-2" @click="deleteAsset">
      Delete
    </button>

    <button type="submit" class="btn btn-success" @click="updateAsset">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Alarm...</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AssetDataService from "../../services/AssetDataService";

@Component
export default class Asset extends Vue {
  private currentAsset: any = null;
  private message = "";

  getAsset(id: string) {
    AssetDataService.get(id)
      .then((response) => {
        this.currentAsset = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  sentToReview(assetId: number) {
    this.$socket.emit('message',{requestId: assetId});
  }

  updateStatus(status: number) {
    this.currentAsset.status = status;
    if (this.updateAsset() && status == 2) {
      this.sentToReview(this.currentAsset.id);
    }
  }

  updateAsset() {
    return AssetDataService.update(this.currentAsset.id, this.currentAsset)
      .then((response) => {
        console.log(response.data);
        this.message = "The asset has been updated successfully!";
        return true;
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
  }

  deleteAsset() {
    AssetDataService.delete(this.currentAsset.id)
      .then((response) => {
        console.log(response.data);
        this.$router.push({ name: "assets" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  mounted() {
    this.message = "";
    this.getAsset(this.$route.params.id);
  }
}
</script>

<style scoped>
.edit-form {
  max-width: 720px;
  margin: auto;
}
</style>