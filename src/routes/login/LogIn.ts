import { Action, ctx, io } from "@interval/sdk";
import { validateLogin } from "./requestService";
import { Tenant } from "./tenats";
import dotenv from "dotenv";

dotenv.config();

export default new Action(async () => {
	await io.display.heading("BetMX");
	await io
		.group({
			username: io.input.text("Enter username"),
			password: io.input.text("Password"),
		})
		.validate(async ({ username, password }) => {
			if (
				(await validateLogin(username, password, Tenant.BetMX)) ===
				false
			) {
				return "Invalid credentials. Please try again.";
			}
		})
		.withChoices(["Login"]);

	await io.display.heading("Bet4");
	await io
		.group({
			bet4username: io.input.text("Enter username"),
			bet4password: io.input.text("Password"),
		})
		.validate(async ({ bet4username, bet4password }) => {
			if (
				(await validateLogin(
					bet4username,
					bet4password,
					Tenant.BetBr
				)) === false
			) {
				return "Invalid credentials. Please try again.";
			}
		})
		.withChoices(["Login"]);

	ctx.redirect({ route: "GlobalSettlement/globalSettlement" });
});
