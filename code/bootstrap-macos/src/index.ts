import inquirer from "inquirer";
import { createGitHubSshKey } from "~/utils/github.js";

const { } = await inquirer.prompt<{ }>({
	name: 'hi',
	message: 'Do you want to set up GitHub SSH Key?',
	type: 'confirm'
})

await
await createGitHubSshKey();