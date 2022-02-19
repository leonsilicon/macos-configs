import inquirer from 'inquirer';
import open from 'open';

export async function downloadLatex() {
	console.info('Opening the MacTeX download page...');
	await open('https://tug.org/mactex/mactex-download.html')
	await inquirer.prompt({
		message: 'Press enter to continue...'
	})
}
