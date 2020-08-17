import Axios from '../http';

class IndexDataService {

  getServerEnvironment() {
    return Axios.get("/environment");
  }
  
}

export default new IndexDataService();