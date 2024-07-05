import { Action, ctx, io } from "@interval/sdk";
import { LoginRequest } from "./loginRequest";
import { requestLogin, validateLogin } from './requestService';
import { LoginResponse } from "./loginResponse";

import dotenv from 'dotenv';

dotenv.config();

export default new Action(async () => {

	await io.display.heading("BetMX");
	const {
		returnValue: { username, password },
	} = await io.group({
		username: io.input.text("Enter username"),
		password: io.input.text("Password")

	}).validate(({ username, password }) => {
		if (!validateLogin(username, password)) {
			return "Invalid credentials. Please try again.";
		}
	}).withChoices(["Login"]);

	await io.display.heading("Bet4");
	const {
		returnValue: { bet4username, bet4password },
	} = await io.group({
		bet4username: io.input.text("Enter username"),
		bet4password: io.input.text("Password"),

	}).validate(({ bet4username, bet4password }) => {
		if (!validateLogin(bet4username, bet4password)) {
			return "Invalid credentials. Please try again.";
		}
	}).withChoices(["Login"]);

	ctx.redirect({ route: "GlobalSettlement/globalSettlement" });
});
