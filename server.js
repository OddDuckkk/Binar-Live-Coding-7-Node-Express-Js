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
// Api get all cars
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

// Api create/insert cars
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

// api to get cars by id
app.get('/api/v1/cars/:id', (req, res) => {
    // select * from cars where id="1" OR NAME="jazz"
    // console.log(req.params);
    const carId = req.params.id;
    const car = cars.find((i) => i.id ==  carId);
    
    // error handling
    if (!car) {
        return res.status(404).json({
            status: "Failed",
            message: `Car with id ${carId} not found`,
            isSuccess: false,
            data: null,
        });  // 404 Not Found  // 200 OK  // 500 Internal Server Error  // 400 Bad Request  // 304 Not Modified  // 201 Created  // 403 Forbidden  // 302 Found  // 401 Unauthorized  // 307 Temporary Redirect  // 308 Permanent Redirect  // 202 Accepted  // 206 Partial Content  // 412 Precondition Failed  // 417 Expectation Failed  // 422 Unprocessable Entity  // 429 Too Many Requests  // 431 Request Header Fields Too Large  // 451 Unavailable For Legal Reasons  // 502 Bad Gateway  //

    }
    res.status(200).json({ 
        status: "Success",
        message: "Success get car data by id",
        isSuccess: true, 
        data: {
            car,
        },
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