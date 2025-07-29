/** biome-ignore-all lint/complexity/noStaticOnlyClass: educational purposes */
import { terminal } from "terminal-kit";


export default class Terminal {
/**
 * Function responsible to clearing the menu, creating a new prompt with the title received as prop, and the terminal content
 * are the options passed as prop, the promise means that it is now waiting for an user answer
 */
static async renderMenu(title: string, options: string[]) {
  terminal.clear();
  terminal.bold.underline(title);
  terminal("\n");
  return terminal.singleColumnMenu(options).promise;
}

/**
 * Waits for user to press enter on the terminal
 */
  static async waitForEnter() {
    terminal.gray("\nPress enter to continue");

    await terminal.inputField({
      echo: false,
    }).promise;
  }

  static success(message: string) {
    terminal.green(message);
  }

}

