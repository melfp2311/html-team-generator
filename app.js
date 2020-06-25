const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//Writing to a file named `team.html` in the `output` folder. Using the variable `outputPath` to target this location.
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
const render = require("./lib/htmlRenderer");
const allMembers = [];


//Used inquirer to gather information about the development team members, and to create objects for each team member
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


//For Manager
function managerInfo() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter your name"
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
        let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
        allMembers.push(manager);
        newMember();
    });
    
}

//For Engineer
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
            name: "github",
            message: "Enter member's GitHub username",
        }
    ]).then((answers) => {
        let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
        allMembers.push(engineer);
        newMember();
    })
}

//For Intern
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
        let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        allMembers.push(intern);
        newMember();
    })
}


// Create an HTML file using the HTML returned from the `render` function con HTMLrenderer file. 
function generateHTML(info, file) {
    fs.writeFile(info, file, (err) => {
      if (err) {
        throw err;
      }
      console.log("Your team is complete!");
    });
  };


newMember();

