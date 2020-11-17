import axios from 'axios'

// module that contains function to get data from the API
export default {
  getUsers: function() {
    return axios.get('https://randomuser.me/api/?results=50&nat=us')
  },
};
