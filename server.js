const fs = require('fs');
const express = require('express');

const app = express();

// Default http route, health check
app.get("/health-check", (req, res) => {
    res.status(200).json({
        "status": "Success",
        "message": "Application is running"
    });
});


app.get('/brandon', (req, res) => {
    res.status(200).json({
        "message": "Ping Successfully!"
    });
})
// Middleware 
app.use((req, res, next) => {
    res.status(404).json({
        "status": "Failed",
        "message": "URL does not exist"
    })
});

app.listen("3000", () => {
    console.log("starting application on port 3000...");
});

// console.log("Hello!")