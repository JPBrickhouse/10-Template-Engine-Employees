# Template Engine for Teams and Employees

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## DESCRIPTION
A node.js command-line application that generates an HTML file, dynamically displaying a team's employee data and credentials.

## SCREENSHOTS
### Working application question prompts
![Question Prompts and App Usage](./imgs/AppRunning.png)

### Generated HTML File
![Generated HTML File](./imgs/htmlFile.png)

### Running Tests
![Running Tests](./imgs/runTests1.png)
![Running Tests](./imgs/runTests2.png)

## TABLE OF CONTENTS
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
    
## INSTALLATION
- Clone the repo for use on your local machine
- Use the command line to locate the cloned repo and make it your current directory
- Type `npm install` in the command line
- This will install the node module packages and dependencies, including inquirer, which is necessary for proper application functionality
- Additionally, create a folder entitled `output` in the directory; this is where the final generated html file will be located once it has been written

## USAGE
- To use the "Template Engine for Teams and Employees" application...
- Use the command line to locate the cloned repo and make it your current directory
- Simply type `node app.js` in the command line
- A series of prompts will inquire about the following items:
    - What is the employee's name?
    - What is the employee's id number?
        - Validation ensures that the id is a valid number
    - What is the employee's email address?
        - Validation ensures that the email is a valid email address
    - This employee is what type of person? (Manager, Intern, Engineer)
    - Depending on the type of person, a subset of questions is asked:
        - Manager: What is the manager's office number?
        - Intern: What school does this student attend?
        - Engineer: Please enter your GitHub username (not the URL, just the username)?
    - Following this, a prompt inquires if the user has more employees to add
    - If they select yes, the series of previous prompts repeats
    - If they select no, the prompts terminate
- When the prompts have terminated and all the inquires have responses, the program generates an HTML file, dynamically displaying a team's employee data and credentials.

### [Video](https://drive.google.com/file/d/1_bJal9IGj56O66INB5FLBOPVpjCINFSx/) showing usage of the successfully deployed application:
[https://drive.google.com/file/d/1_bJal9IGj56O66INB5FLBOPVpjCINFSx/](https://drive.google.com/file/d/1_bJal9IGj56O66INB5FLBOPVpjCINFSx/)

## LICENSE
License: MIT License<br>
[https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)

## CONTRIBUTING
[https://github.com/JPBrickhouse](https://github.com/JPBrickhouse)

## TESTS
- There are several tests included with the repo
- These tests confirm that the classes and subclasses are built correctly
- To run the tests...
    - Use the command line to locate the cloned repo and make it your current directory
    - Simply type `npm run test` in the command line
    - The output information will confirm whether the tests have passed or failed

## QUESTIONS
Feel free to visit the following GitHub for more information:
[https://github.com/JPBrickhouse](https://github.com/JPBrickhouse)
