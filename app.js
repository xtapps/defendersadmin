const express = require('express');
const app = express();
const port = 800;

app.use(express.static('./dist/coreui-free-angular-admin-template')); // Replace with the path to your Angular app's build output

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});