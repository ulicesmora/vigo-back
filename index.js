const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/spaces", require("./routes/spaces"));
api.use("/api/reservation", require("./routes/reservartion"));
api.use("/api/reviews", require("./routes/reviews"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});