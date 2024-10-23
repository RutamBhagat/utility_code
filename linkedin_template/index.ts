import clipboard from "clipboardy";
import fs from "fs/promises";
import inquirer from "inquirer";
import path from "path";
import Handlebars from "handlebars";

async function getTemplates(): Promise<string[]> {
  const templatesDir = path.join(__dirname, "templates");
  const files = await fs.readdir(templatesDir);
  return files.filter((file) => file.endsWith(".txt"));
}

async function getTemplateContent(templateName: string): Promise<string> {
  const templatePath = path.join(__dirname, "templates", templateName);
  return fs.readFile(templatePath, "utf-8");
}

function extractFields(
  template: string
): { field: string; defaultValue: string }[] {
  const fieldRegex = /{([^{}[\]]+)(?:\[([^\]]+)\])?}/g;
  const fields: { field: string; defaultValue: string }[] = [];
  let match;
  while ((match = fieldRegex.exec(template)) !== null) {
    fields.push({ field: match[1], defaultValue: match[1] }); // Use field name as default value
  }
  return fields;
}

async function promptForFields(
  fields: { field: string; defaultValue: string }[],
  template: string
): Promise<Record<string, string>> {
  const questions = fields.map(({ field }) => ({
    type: "input",
    name: field,
    message: `Enter value for ${field}:`,
    default: "", // Show empty value in the prompt
  }));

  // @ts-ignore
  const answers = await inquirer.prompt(questions);

  // Handle empty inputs by using the default value from the template
  const values: Record<string, string> = {};
  fields.forEach(({ field, defaultValue }) => {
    values[field] = answers[field] || defaultValue;
  });

  return values;
}

function fillTemplate(
  template: string,
  values: Record<string, string>
): string {
  let filledTemplate = template;
  for (const [key, value] of Object.entries(values)) {
    filledTemplate = filledTemplate.replace(new RegExp(`{${key}}`, "g"), value);
  }
  return filledTemplate;
}

async function main() {
  try {
    const templates = await getTemplates();
    const { selectedTemplate } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedTemplate",
        message: "Select a template:",
        choices: templates,
      },
    ]);

    const templateContent = await getTemplateContent(selectedTemplate);
    console.log("Template Content:", templateContent); // Debugging statement

    const fields = extractFields(templateContent);
    console.log("Extracted Fields:", fields); // Debugging statement

    const values = await promptForFields(fields, templateContent);
    console.log("Provided Values:", values); // Debugging statement

    const filledTemplate = fillTemplate(templateContent, values);
    console.log("Filled Template:", filledTemplate); // Debugging statement

    await fs.writeFile(path.join(__dirname, "output.txt"), filledTemplate);
    await clipboard.write(filledTemplate);

    console.log("Template filled and saved to output.txt");
    console.log("Content also copied to clipboard");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
