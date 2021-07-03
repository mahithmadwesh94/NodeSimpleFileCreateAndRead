const express = require("express");
const app = express();
const fs = require("fs");
const port = process.env.PORT || 8081;

app.use(express.json())

const students = [];

app.get("/", (req, res) => {
    res.status(200).send('Navigate to /files to check the files created')
})


app.get("/files", (req, res) => {
    fs.readdir("./files/", function (err, files) {
        if (err) throw err;
        if (files.length) {

            res.status(200).send(`Files created in the Folder: ` + files.join(',         '))

        } else {
            res.status(404).send(`No Files Created yet. Please post to /files`)

        }
    })
})



app.post("/files", (req, res) => {
    const d = new Date();
    let fileName = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}_${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}.txt`
    fs.writeFile(`./files/${fileName}`, `${new Date()}`, function (err) {
        if (err) throw err;
        res.status(200).send('File Created with current date-time.txt file name')
    })
})


app.listen(port, () => {
    console.log(`serving at port ${port}`);
})