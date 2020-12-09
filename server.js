require('dotenv').config();
require('./lib/utils/pool').connect();

const app = require('./index');
const PORT = 3001;

app.listen(PORT, () =>{
  console.log(`Started on ${PORT}`);
});
