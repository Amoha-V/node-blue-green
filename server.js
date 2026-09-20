const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;
const VERSION = process.env.VERSION || "BLUE";

app.get("/", (req, res) => {
    res.send(`
        <h1>Node.js Blue-Green Deployment</h1>
        <h2>Environment: ${VERSION}</h2>
        <p>Application is running successfully.</p>
    `);
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        environment: VERSION
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});