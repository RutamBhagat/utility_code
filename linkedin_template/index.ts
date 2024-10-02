import clipboard from "clipboardy";
import fs from "fs/promises";
import inquirer from "inquirer";
import path from "path";

async function getTemplates(): Promise<string[]> {
  const templatesDir = path.join(__dirname, "templates");
  const files = await fs.readdir(templatesDir);
  return files.filter((file) => file.endsWith(".txt"));
}

async function getTemplateContent(templateName: string): Promise<string> {
  const templatePath = path.join(__dirname, "templates", templateName);
  return fs.readFile(templatePath, "utf-8");
}

function extractFields(template: string): string[] {
  const fieldRegex = /{([^{}[\]]+)(?:\[([^\]]+)\])?}/g;
  const fields: string[] = [];
  let match;
  while ((match = fieldRegex.exec(template)) !== null) {
    fields.push(match[1]);
  }
  return [...new Set(fields)]; // Remove duplicates
}

async function promptForFields(
  fields: string[],
  template: string
): Promise<Record<string, string>> {
  const questions = fields.map((field) => ({
    type: "input",
    name: field,
    message: `Enter value for ${field}:`,
    default: template.match(new RegExp(`{${field}\\[([^\\]]+)\\]}`))?.[1] || "",
  }));

  // @ts-ignore
  return inquirer.prompt(questions);
}

function fillTemplate(
  template: string,
  values: Record<string, string>
): string {
  return template.replace(
    /{([^{}[\]]+)(?:\[[^\]]+\])?}/g,
    (match, field) => values[field] || ""
  );
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
    const fields = extractFields(templateContent);
    const values = await promptForFields(fields, templateContent);
    const filledTemplate = fillTemplate(templateContent, values);

    await fs.writeFile(path.join(__dirname, "output.txt"), filledTemplate);
    await clipboard.write(filledTemplate);

    console.log("Template filled and saved to output.txt");
    console.log("Content also copied to clipboard");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
