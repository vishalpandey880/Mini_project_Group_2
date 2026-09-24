const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.post("/student", (req, res) => {
    const { name, course, email } = req.body;

    fs.readFile("Students.json", "utf8", (err, data) => {

        if (err) {
            return res.status(500).json({
            });
        }

        let students = JSON.parse(data);

        const student = {
            id: students.length + 1,
            name: name,
            course: course,
            email: email
        };

        students.push(student);

        fs.writeFile(
            "Students.json",JSON.stringify(students, null, 2),
            (err) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Error saving student"
                    });
                }

                res.status(201).json({
                    success: true,
                    message: "Student added successfully",
                    data: student
                });
            }
        );
    });
});

app.get("/students", (req, res) => {

    fs.readFile("Students.json", "utf8", (err, data) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error reading file"
            });
        }

        const students = JSON.parse(data);

        res.json({
            success: true,
            count: students.length,
            data: students
        });
    });
});

app.listen(3000, () => {
    console.log("Server running on port 5000");
});