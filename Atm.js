#! /usr/bin/env node 
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
let balance = 100000;
let pin = 2879;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk_1.default.white("WELCOME"));
        let pinpassword = yield inquirer_1.default.prompt([{
                name: "pin",
                type: "number",
                message: chalk_1.default.yellowBright("Please Enter 4 digit Pin")
            }]);
        if ((yield pinpassword.pin) === pin) {
            console.log(chalk_1.default.greenBright("Entered pin is correct"));
            let option_list = yield inquirer_1.default.prompt([{
                    name: "options",
                    type: "list",
                    message: ("Select Transaction Type"),
                    choices: ["Withdrawal", "Deposit", "Balance Inquiry"],
                }]);
            if (option_list.options === "Withdrawal") {
                let amountChoice = yield inquirer_1.default.prompt([{
                        name: "amountChoice",
                        type: "list",
                        message: ("Enter withdrawal amount or check Quick cash options"),
                        choices: (["Enter withdrawal amount", "View Quick cash options"])
                    }]);
                if (amountChoice.amountChoice === "Enter withdrawal amount") {
                    let Amountentered = yield inquirer_1.default.prompt([{
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
                        console.log(chalk_1.default.greenBright("Your transaction is successful!"));
                        console.log(chalk_1.default.greenBright("Please collect your cash"));
                        console.log(chalk_1.default.greenBright("Your remaining balance is: Rs. " + balance));
                    }
                    else {
                        console.log(chalk_1.default.red("Insufficient balance. Please enter a lower amount."));
                    }
                }
                else if (amountChoice.amountChoice === "View Quick cash options") {
                    let quickCashOption = yield inquirer_1.default.prompt([{
                            name: "quickCashOption",
                            type: "list",
                            message: "Select Quick cash option",
                            choices: ["5000", "10000", "20000", "50000"]
                        }]);
                    // Allows withdrawal based on option chosen and parseInt converts string to a number
                    let chosenAmount = parseInt(quickCashOption.quickCashOption);
                    if (chosenAmount <= balance) {
                        balance = balance - chosenAmount;
                        console.log(chalk_1.default.green("Transaction successful! Your new balance is Rs. " + balance));
                    }
                    else {
                        console.log(chalk_1.default.redBright("Insufficient balance. Please choose a lower amount."));
                    }
                }
            }
            else if (option_list.options === "Deposit") {
                console.log("Please insert your Deposit");
                console.log(chalk_1.default.green("Deposit successful! Please take your receipt."));
            }
            else if (option_list.options === "Balance Inquiry") {
                console.log(chalk_1.default.magentaBright("Your current balance is: Rs. " + balance));
            }
            else {
                console.log(chalk_1.default.red("Invalid input"));
            }
        }
        else {
            console.log(chalk_1.default.red("Invalid pin. Please try again."));
            return;
        }
    });
}
main();
