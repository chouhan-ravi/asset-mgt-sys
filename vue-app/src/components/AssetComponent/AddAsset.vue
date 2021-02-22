<template>
  <div class="submit-form">
    <div class="col-md-12">
      <div class="page-header">
        <h3>New Asset Request:
          <small>
            <router-link to="/assets" tag="a" class="label label-warning">
              Back to list
            </router-link>
          </small>
        </h3>  
      </div>
    </div>
    <div class="col-md-6 col-md-offset-2">
      <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li class="text-danger" v-for="(error,index) in errors" :key="index">{{ error }}</li>
      </ul>
    </p>
    </div>
    <div class="col-md-12" v-if="!submitted">
      <form class="form-horizontal" action="#" method="post">
      <div class="form-group">
        <label for="type" class="col-sm-2 control-label">Type</label>
        <div class="col-sm-6">
          <select
            class="form-control"
            id="type"
            required
            v-model="asset.type"
            name="type"
          >
            <option value=""> - Select - </option>
            <option value="goods">Goods</option>
            <option value="pallet">Pallets</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="quantity" class="col-sm-2 control-label">Qauantity</label>
        <div class="col-sm-6">
        <input
          type="number"
          class="form-control"
          id="quantity"
          required
          v-model="asset.quantity"
          name="quantity"
        />
        </div>
      </div>

      <div class="form-group">
        <label for="timestamp" class="col-sm-2 control-label">Date & Time</label>
        <div class="col-sm-6">
        <input
          type="date"
          class="form-control"
          id="timestamp"
          required
          v-model="asset.timestamp"
          name="timestamp"
        />
        </div>
      </div>

      <div class="form-group">
        <label for="note" class="col-sm-2 control-label">Note</label>
        <div class="col-sm-6">
        <input
          class="form-control"
          id="note"
          required
          v-model="asset.note"
          name="note"
        />
        </div>
      </div>
      
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-6 btn-group">
          <button type="button" class="btn btn-success" @click="saveAsset">Submit</button>
          <router-link to="/assets" tag="button" class="btn btn-danger">
            Cancel
          </router-link>
        </div>
      </div>
      </form>
    </div>
    <div class="col-md-12" v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newAsset">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AssetDataService from "../../services/AssetDataService";

@Component
export default class AddAsset extends Vue {
  private asset: any = {
    id: null,
    supplierId: "123",
    reviewerId: "",
    carrierId: "",
    type: "",
    quantity: "",
    note: "",
    timestamp: ""
  };
  private errors: Array<string> = [] ;

  private submitted = false;

  sentToReview(assetId: number) {
    this.$socket.emit('message',{requestId: assetId});
  }

  saveAsset() {
    if(!this.validForm()) {
        return false;
    }
    const data = {
      id: this.asset.id,
      supplierId: this.asset.supplierId,
      reviewerId: this.asset.reviewerId,
      carrierId: this.asset.carrierId,
      type: this.asset.type,
      quantity: this.asset.quantity,
      note: this.asset.note,
      timestamp: this.asset.timestamp,
      state: this.asset.state
    };

    AssetDataService.create(data)
      .then((response) => {
        this.asset.id = response.data.id;
        console.log(response.data);
        this.submitted = true;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  validForm() {
    this.errors = [];

    if (!this.asset.type) {
      this.errors.push("Asset type is required.");
    }
    if (!this.asset.quantity) {
      this.errors.push('Asset quantity is required.');
    } 
    if (!this.errors.length) {
      return true;
    }
    return false;
  }

  newAsset() {
    this.submitted = false;
    this.asset = {
      id: null,
      supplierId: "123",
      reviewerId: "",
      carrierId: "",
      type: "",
      quantity: "",
      note: "",
      timestamp: ""
    };
  }
}
</script>

<style scoped>
.submit-form {
  max-width: 720px;
  margin: auto;
}
</style>