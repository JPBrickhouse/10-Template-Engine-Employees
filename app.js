const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "./output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?",
        type: "string"
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee's id number?",
        validate: function (id) {
            var valid = isNaN(id);
            if (valid) {
                console.log("\nPlease enter a valid number")
                return false;
            }
            else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email address?",
        // Validation code sourced from the following: https://gist.github.com/Amitabh-K/ae073eea3d5207efaddffde19b1618e8
        validate: function (email) {
            var valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            if (valid) {
                return true;
            } else {
                console.log("\nPlease enter a valid email")
                return false;
            }
        }
    },
    {
        type: "list",
        name: "employeeType",
        message: "This person is what type of employee?",
        choices: [
            "Manager",
            "Intern",
            "Engineer"
        ]
    }
]

const managerQuestions = [
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?",
        validate: function (id) {
            var valid = isNaN(id);
            if (valid) {
                console.log("\nPlease enter a valid number")
                return false;
            }
            else {
                return true;
            }
        }
    }
]

const internQuestions = [
    {
        type: "input",
        name: "school",
        message: "What school does this student attend?",
        type: "string"
    }
]

const engineerQuestions = [
    {
        type: "input",
        name: "github",
        message: "Please enter your GitHub username (not the url, just the username):",
        type: "string"
    }
]

const moreEmployeeQuestion = [
    {
        type: "confirm",
        name: "more",
        message: "More employees to add?",
    }
]


async function askQuestions() {
    try {

        // Initializing an empty array to hold all the raw data employee objects
        const allEmployeesRawData = []

        // Initializing a variable moreEmployees and setting it to true
        // (This will be used with the while loop)
        var moreEmployees = true;

        while (moreEmployees) {
            // Running inquirer.prompt on the questions array of objects
            // Await the results and then store as the constant employeeAnswers
            const employeeAnswers = await inquirer.prompt(employeeQuestions);
            
            // Running a switch case that is dependent on the results from employeeAnswers.employeeType
            // This asks a supplemental series of questions, tailored to the type of employee
            // Those supplemental answers are added to the employeeAnswers object
            switch (employeeAnswers.employeeType) {
                case "Manager": {
                    const managerAnswers = await inquirer.prompt(managerQuestions);
                    employeeAnswers.supplementalAnswers = managerAnswers;
                    break;
                }
                case "Intern": {
                    const internAnswers = await inquirer.prompt(internQuestions);
                    employeeAnswers.supplementalAnswers = internAnswers;
                    break;
                }
                case "Engineer": {
                    const engineerAnswers = await inquirer.prompt(engineerQuestions);
                    employeeAnswers.supplementalAnswers = engineerAnswers;
                    break;
                }
            }
            
            // Pushing the employeeAnswers object into the allEmployeesRawData array
            allEmployeesRawData.push(employeeAnswers);

            // Asking a question to the user if they want to input more employee data
            // The question is a boolean, returning true or false, stored within an object
            const moreEmployeesObject = await inquirer.prompt(moreEmployeeQuestion);

            // Going in the moreEmployeesObject and going to the more key
            // The value there will either be true or false
            // Set that value as the value of the variable moreEmployees
            // The while loop will only continue to run moreEmployees is true
            moreEmployees = moreEmployeesObject.more;
        }

        // Initializing an empty array to hold all the formatted employee objects
        const formattedAllEmployeesObject = [];

        // Going through the raw data array and formatting it
        // (Each element is an employee object)
        allEmployeesRawData.forEach(element => {
            var name = element.name;
            var id = element.id;
            var email = element.email;
            var employeeType = element.employeeType;
            // Running a switch case dependent on the employee type
            switch(employeeType) {
                case "Manager": {
                    var officeNumber = element.supplementalAnswers.officeNumber;
                    var manager = new Manager(name,id,email,officeNumber);
                    formattedAllEmployeesObject.push(manager);
                    break;
                }
                case "Intern": {
                    var school = element.supplementalAnswers.school;
                    var intern = new Intern(name,id,email,school);
                    formattedAllEmployeesObject.push(intern);
                    break;
                }
                case "Engineer": {
                    var github = element.supplementalAnswers.github;
                    var engineer = new Engineer(name,id,email,github);
                    formattedAllEmployeesObject.push(engineer);
                    break;
                }
            }
        });

        console.log(formattedAllEmployeesObject);
        return(formattedAllEmployeesObject);

    }
    catch (err) {
        // catching and console logging an error
        console.log(err);
    }
}

askQuestions();

