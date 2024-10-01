import * as fs from "fs";

import inquirer from "inquirer";

const templatesDir =
  "/home/rutam/Downloads/Code/utility_code/code_template/templates";
const outputFile = "/tmp/selected_template.txt";

async function selectTemplate() {
  const templateFiles = fs
    .readdirSync(templatesDir)
    .filter((file) => file.endsWith(".sh"));

  const { selectedTemplate } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedTemplate",
      message: "Select a template:",
      choices: templateFiles,
    },
  ]);

  // Write the selected template to the output file
  fs.writeFileSync(outputFile, selectedTemplate);
}

selectTemplate();
