const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

// Initialize data from json file
const cars = JSON.parse(
    fs.readFileSync(`${__dirname}/assets/data/cars.json`, "utf-8")
);

// Default http route, health check
app.get("/health-check", (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Application is running"
    });
});

// Rute brandon 
app.get('/brandon', (req, res) => {
    res.status(200).json({
        message: "Ping Successfully!"
    });
})

//  /api/v1/collections 
app.get('/api/v1/cars', (req, res) => {
    res.status(200).json({ 
        status: "Success",
        message: "Success getting cars data",
        isSuccess: true, 
        totalData: cars.length,
        data: {
            cars,
        },
    });
})

app.post('/api/v1/cars', (req, res) => {
    // insert into

    const newCar = req.body;

    cars.push(newCar);
    
    fs.writeFile(`${__dirname}/assets/data/cars.json`, JSON.stringify(cars), (err) => {
        res.status(200).json({ 
            status: "Success",
            message: "Success added car data",
            isSuccess: true, 
            data: {
                car: newCar,
            }
        });
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