import Axios from '../http';

class EntryDataService {
  getAll(params) {
    return Axios.get("/list", { params });
  }

  getLatest() {
    return Axios.get("/latest");
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