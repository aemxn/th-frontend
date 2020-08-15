import Axios from '../http';

class EntryDataService {
  getLatest() {
    return Axios.get("/latest");
  }

  explore(params) {
    return Axios.get("/explore", { params });
  }

  create(entry) {
    return Axios.post("/", entry);
  }

  update(id, entry) {
    return Axios.put(`/${id}`, entry);
  }

  delete(id) {
      return Axios.delete(`/${id}`);
  }

  export() {
    return Axios.get("/export");
  }
}

export default new EntryDataService();