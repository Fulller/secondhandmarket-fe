import axios, { service } from "@tools/axios.tool";

const UserService = {
  getProfile() {
    return service(axios.get("/users"));
  },
  udpateProfile(data) {
    return service(axios.put("/users", data));
  },
};

export default UserService;
