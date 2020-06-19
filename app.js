const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const allMembers = [];

function newMember() {
    inquirer.prompt([
        {
            type: "list",
            name: "member",
            message: "Which role has the new member?",
            choices: ["Manager", "Engineer", "Intern", "I'm done adding members"]
        }
    ]).then(info => {
        if(info.member === "Manager"){
            managerInfo();
        } else if(info.member === "Engineer"){
            engineerInfo();
        } else if(info.member === "Intern"){
            internInfo();
        } else if(info.member === "I'm done adding members") {
            generateHTML(outputPath, render(allMembers));
        }
    })
}

function managerInfo() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter your name"
        },
        {
            type: "input",
            name: "role",
            message: "Enter your role"
        },
        {
            type: "input",
            name: "id",
            message: "Enter your id"
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Enter your office number"
        }
    ]).then((answers) => {
        let manager = new Manager(answers.name, answers.role, answers.id, answers.email, answers.officeNumber)
        allMembers.push(manager);
        newMember();
    });
    
}
function engineerInfo() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter member's name"
        },
        {
            type: "input",
            name: "id",
            message: "Enter member's ID number"
        },
        {
            type: "input",
            name: "email",
            message: "Enter member's email"
        },
        {
            type: "input",
            name: "user",
            message: "Enter member's GitHub username",
        }
    ]).then((answers) => {
        let engineer = new Engineer(answers.name, answers.role, answers.id, answers.email, answers.github)
        allMembers.push(engineer);
        newMember();
    })
}

function internInfo() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter member's name"
        },
        {
            type: "input",
            name: "id",
            message: "Enter member's ID number"
        },
        {
            type: "input",
            name: "email",
            message: "Enter member's email"
        },
        {
            type: "input",
            name: "school",
            message: "Enter member's school",
        }
    ]).then((answers) => {
        let intern = new Intern(answers.name, answers.role, answers.id, answers.email, answers.school);
        allMembers.push(intern);
        newMember();
    })
}


function generateHTML(info, file) {
    fs.writeFile(info, file, (err) => {
      if (err) {
        throw err;
      }
      console.log("Your team is complete!");
    });
  };


newMember();



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