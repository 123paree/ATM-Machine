#! /usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";
let balance = 100000;
let pin = 2879;
async function main() {
    console.log(chalk.white("WELCOME"));
    let pinpassword = await inquirer.prompt([{
            name: "pin",
            type: "number",
            message: chalk.yellowBright("Please Enter 4 digit Pin")
        }]);
    if (await pinpassword.pin === pin) {
        console.log(chalk.greenBright("Entered pin is correct"));
        let option_list = await inquirer.prompt([{
                name: "options",
                type: "list",
                message: ("Select Transaction Type"),
                choices: ["Withdrawal", "Deposit", "Balance Inquiry"],
            }]);
        if (option_list.options === "Withdrawal") {
            let amountChoice = await inquirer.prompt([{
                    name: "amountChoice",
                    type: "list",
                    message: ("Enter withdrawal amount or check Quick cash options"),
                    choices: (["Enter withdrawal amount", "View Quick cash options"])
                }]);
            if (amountChoice.amountChoice === "Enter withdrawal amount") {
                let Amountentered = await inquirer.prompt([{
                        name: "amount",
                        type: "number",
                        message: "Enter withdrawal amount",
                        validate: (input) => {
                            if (input >= 100) {
                                return true;
                            }
                            else {
                                return ("Please enter an amount greater than or equal to 100");
                            }
                        }
                    }]);
                if (Amountentered.amount <= balance) {
                    balance = balance - Amountentered.amount;
                    console.log(chalk.greenBright("Your transaction is successful!"));
                    console.log(chalk.greenBright("Please collect your cash"));
                    console.log(chalk.greenBright("Your remaining balance is: Rs. " + balance));
                }
                else {
                    console.log(chalk.red("Insufficient balance. Please enter a lower amount."));
                }
            }
            else if (amountChoice.amountChoice === "View Quick cash options") {
                let quickCashOption = await inquirer.prompt([{
                        name: "quickCashOption",
                        type: "list",
                        message: "Select Quick cash option",
                        choices: ["5000", "10000", "20000", "50000"]
                    }]);
                // Allows withdrawal based on option chosen and parseInt converts string to a number
                let chosenAmount = parseInt(quickCashOption.quickCashOption);
                if (chosenAmount <= balance) {
                    balance = balance - chosenAmount;
                    console.log(chalk.green("Transaction successful! Your new balance is Rs. " + balance));
                }
                else {
                    console.log(chalk.redBright("Insufficient balance. Please choose a lower amount."));
                }
            }
        }
        else if (option_list.options === "Deposit") {
            console.log("Please insert your Deposit");
            console.log(chalk.green("Deposit successful! Please take your receipt."));
        }
        else if (option_list.options === "Balance Inquiry") {
            console.log(chalk.magentaBright("Your current balance is: Rs. " + balance));
        }
        else {
            console.log(chalk.red("Invalid input"));
        }
    }
    else {
        console.log(chalk.red("Invalid pin. Please try again."));
        return;
    }
}
main();
