import http from "../http-common";

class AssetDataService {
  getAll() {
    return http.get("/assets");
  }

  getAllRequest() {
    return http.get("/requests");
  }

  get(id: string) {
    return http.get(`/assets/${id}`);
  }

  create(data: any) {
    return http.post("/assets", data);
  }

  update(id: string, data: any) {
    return http.put(`/assets/${id}`, data);
  }

  delete(id: string) {
    return http.delete(`/assets/${id}`);
  }

  deleteAll() {
    return http.delete(`/assets`);
  }

  findBySearch(search: string) {
    return http.get(`/assets?q=${search}`);
  }
}

export default new AssetDataService();