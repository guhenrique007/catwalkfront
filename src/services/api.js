import axios from 'axios';


const api = axios.create({
    baseURL: 'http://catwalk-250018.appspot.com'
});

export default api;

/*  EXEMPLO RESPONSE API

const response = await api.post('/supermarkets',{
   //corpo: //usar state
   supermarketName: "extra",
})

*/