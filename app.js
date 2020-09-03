// Pulling in the necessary classes, packages, and dependencies
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Building the output file directory and file name (aka, the output file path)
const OUTPUT_DIR = path.resolve(__dirname, "./output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Pulling in the render function from the file htmlRenderer
const render = require("./lib/htmlRenderer");

// Questions to be asked for ALL employees
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

// Questions to be asked ONLY for managers
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

// Questions to be asked ONLY for interns
const internQuestions = [
    {
        type: "input",
        name: "school",
        message: "What school does this student attend?",
        type: "string"
    }
]

// Questions to be asked ONLY for engineers
const engineerQuestions = [
    {
        type: "input",
        name: "github",
        message: "Please enter your GitHub username (not the url, just the username):",
        type: "string"
    }
]

// Question asking the user if they want to add more employee data
const moreEmployeeQuestion = [
    {
        type: "confirm",
        name: "more",
        message: "More employees to add?",
    }
]

// Async function to ask the user input questions from the command line
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
            const name = element.name;
            const id = element.id;
            const email = element.email;
            const employeeType = element.employeeType;
            // Running a switch case dependent on the employee type
            switch (employeeType) {
                case "Manager": {
                    const officeNumber = element.supplementalAnswers.officeNumber;
                    const manager = new Manager(name, id, email, officeNumber);
                    formattedAllEmployeesObject.push(manager);
                    break;
                }
                case "Intern": {
                    const school = element.supplementalAnswers.school;
                    const intern = new Intern(name, id, email, school);
                    formattedAllEmployeesObject.push(intern);
                    break;
                }
                case "Engineer": {
                    const github = element.supplementalAnswers.github;
                    const engineer = new Engineer(name, id, email, github);
                    formattedAllEmployeesObject.push(engineer);
                    break;
                }
            }
        });

        return (formattedAllEmployeesObject);
    }
    catch (err) {
        // catching and console logging an error
        console.log(err);
    }
}

// Async function to build the content of the html file
async function buildingTheHTML() {

    // Awaiting the returned results from the function askQuestions()
    // Storing the return results as formattedAllEmployeesObject
    const formattedAllEmployeesObject = await askQuestions();

    // Awaiting the returned results from the render function,
    // passing it the formattedAllEmployeesObject
    // Storing the returned results as outputHTML
    const outputHTML = await render(formattedAllEmployeesObject)

    // fs.writeFile requires the following arguments passed:
    // file, data, callback function
    // The file name is given by outputPath
    // The data is the outputHTML
    // The callback function checks if there's an error and console logs it
    // Otherwise, it console logs the note saying "The file has been saved"
    fs.writeFile(outputPath, outputHTML, function (err) {
        if (err) {
            return console.log(err);
        }
        else {
            console.log('The file has been saved!');
        }
    });
}

// Running the function buildingTheHTML
buildingTheHTML();
