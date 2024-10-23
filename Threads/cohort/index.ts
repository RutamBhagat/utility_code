import clipboard from "clipboardy";
import fs from "fs/promises";
import inquirer from "inquirer";
import path from "path";

const HARDCODED_DIR = "/home/voldemort/Desktop/Code/utility_code/Threads/cohort";

async function getTemplateFiles(): Promise<string[]> {
  const templatesDir = path.join(HARDCODED_DIR, "templates");
  try {
    const files = await fs.readdir(templatesDir);
    const templateFiles = files.filter(file => file.endsWith('.md'));
    console.log("Available template files:", templateFiles);
    return templateFiles;
  } catch (error) {
    console.error("Error reading templates directory:", error);
    throw new Error("Failed to read templates directory");
  }
}

async function readTemplate(templateFile: string): Promise<string> {
  const templatePath = path.join(HARDCODED_DIR, "templates", templateFile);
  try {
    return await fs.readFile(templatePath, "utf-8");
  } catch (error) {
    console.error(`Error reading ${templateFile}:`, error);
    throw new Error(`Failed to read ${templateFile} file`);
  }
}

async function getWeekFolders(): Promise<string[]> {
  const weeksFolderPath = path.join(HARDCODED_DIR, "weeks");
  try {
    const folders = await fs.readdir(weeksFolderPath);
    const weekFolders = folders.filter((folder) => folder.startsWith("week_"));
    console.log("Available week folders:", weekFolders);
    return weekFolders;
  } catch (error) {
    console.error("Error reading weeks folder:", error);
    throw new Error("Failed to read weeks folder");
  }
}

async function readInfoFile(weekFolder: string): Promise<string> {
  const infoFilePath = path.join(HARDCODED_DIR, "weeks", weekFolder, "info.md");
  const diagramsFilePath = path.join(HARDCODED_DIR, "weeks", weekFolder, "diagrams.md");
  console.log("Attempting to read info file from:", infoFilePath);

  let infoContent = "";
  let diagramsContent = "";

  // Read info.md content
  try {
    infoContent = await fs.readFile(infoFilePath, "utf-8");
    if (infoContent.trim() === "") {
      console.warn("Warning: info.md file is empty");
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.error(`info.md file not found at ${infoFilePath}`);
    } else {
      console.error(`Error reading info.md for ${weekFolder}:`, error);
    }
    throw new Error(`Failed to read info.md file for ${weekFolder}`);
  }

  // Try to read diagrams.md content
  try {
    diagramsContent = await fs.readFile(diagramsFilePath, "utf-8");
    console.log("Successfully read diagrams.md");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.warn(`diagrams.md file not found at ${diagramsFilePath}`);
    } else {
      console.error(`Error reading diagrams.md for ${weekFolder}:`, error);
      throw new Error(`Failed to read diagrams.md file for ${weekFolder}`);
    }
  }

  // Append diagrams.md content if it exists
  if (diagramsContent.trim() !== "") {
    infoContent += `\n\n---\n\n### Key Points from Diagrams\n\n${diagramsContent}\n\n---\n\n**Note**: The thread should be based on the key points outlined in the diagrams above.`;
  }

  return infoContent;
}


async function generateOutput(
  template: string,
  replacements: Record<string, string>,
  infoContent: string
): Promise<string> {
  let output = `\`\`\`\n${infoContent}\n\`\`\`\n\n${template}`;
  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(`{${key}}`, "g");
    output = output.replace(regex, value);
  }
  return output;
}

async function main() {
  try {
    const templateFiles = await getTemplateFiles();
    if (templateFiles.length === 0) {
      throw new Error("No template files found");
    }

    const { templateFile } = await inquirer.prompt([
      {
        type: "list",
        name: "templateFile",
        message: "Select a template file:",
        choices: templateFiles,
      },
    ]);
    console.log("Selected template file:", templateFile);

    const template = await readTemplate(templateFile);
    const weekFolders = await getWeekFolders();
    if (weekFolders.length === 0) {
      throw new Error("No week folders found");
    }

    const { weekFolder } = await inquirer.prompt([
      {
        type: "list",
        name: "weekFolder",
        message: "Select a week folder:",
        choices: weekFolders,
      },
    ]);
    console.log("Selected week folder:", weekFolder);

    const weekNumber = weekFolder.split("_")[1];
    const placeholders =
      template.match(/{([^}]+)}/g)?.map((p) => p.slice(1, -1)) || [];
    const userInputs: Record<string, string> = {};
    for (const placeholder of placeholders) {
      if (placeholder !== "info.md") {
        const { value } = await inquirer.prompt([
          {
            type: "input",
            name: "value",
            message: `Enter the value for ${placeholder}:`,
          },
        ]);
        userInputs[placeholder] = value;
      }
    }

    const infoContent = await readInfoFile(weekFolder);
    console.log("Info content length:", infoContent.length);

    const output = await generateOutput(template, userInputs, infoContent);

    // Write to output.md in the same directory as info.md
    const outputPath = path.join(HARDCODED_DIR, "weeks", weekFolder, "output.md");
    await fs.writeFile(outputPath, output);
    console.log(`Output written to ${outputPath}`);

    // Copy to clipboard
    await clipboard.write(output);
    console.log("Output copied to clipboard");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main().catch(console.error);
