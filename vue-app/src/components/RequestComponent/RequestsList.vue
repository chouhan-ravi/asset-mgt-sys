<template>
  <div class="raw">
    <div class="col-md-12">
      <div class="page-header">
        <h3>Request List</h3>
      </div>
    </div>
    <div class="col-md-4">
      <div class="input-group">
        <input type="text" class="form-control" v-model="search" @change="searchRequest" placeholder="Search for...">
        <span class="input-group-btn">
          <button class="btn btn-default" type="button" @click="searchRequest">Go!</button>
        </span>
      </div>
    </div>
    <div class="col-md-2">
      <div class="form-group">
        <button class="form-control btn btn-danger" @click="removeAssets">Remove All</button>
      </div>
    </div>
    <div class="col-md-2 pull-right">
      <div class="form-group">
        <button type="button" class="btn btn-info" @click="refreshList">Refresh</button>
      </div>
    </div>
    <div class="col-md-12">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr :class="{ success: asset.state, active: !asset.state }"
            v-for="(asset, index) in assets"
            :key="index">
              <th scope="row">{{(index+1)}}</th>
              <td>{{asset.type}}</td>
              <td>{{asset.quantity}}</td>
              <td>{{asset.timestamp}}</td>
              <td>{{asset.status}}</td>
              <td>
                <a class="label label-info" :href="'/requests/' + asset.id">Review</a>
                <a class="label label-danger" @click="rejectRequest(asset)">Reject</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import AssetDataService from "../../services/AssetDataService";

@Component({})
export default class RequestsList extends Vue {
  private assets: any[] = [];
  private currentAsset: any = null;
  private currentIndex = -1;
  private search = "";

  retrieveRequests() {
    AssetDataService.getAllRequest()
      .then((response) => {
        this.assets = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveRequests();
    this.currentAsset = null;
    this.currentIndex = -1;
  }

  setActive(alarm: any, index: number) {
    this.currentAsset = alarm;
    this.currentIndex = index;
  }

  removeAssets() {
    AssetDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  rejectRequest(request: any) {
    request.status = 1;
    AssetDataService.update(request.id, request)
      .then((response) => {
        console.log(response.data);
        this.retrieveRequests();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchRequest() {
    AssetDataService.findBySearch(this.search)
      .then((response) => {
        this.assets = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  mounted() {
    this.retrieveRequests();
  }
}
</script>

<style scoped>
body {
  padding-top: 70px;
}
</style>