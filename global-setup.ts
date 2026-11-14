import { initialLogin } from "./utilities/login-helper";
import { env } from "process";

async function globalSetup() {
    await initialLogin();
    console.log(`Initializing E2E tets on ${env.ENV} environment..`);
}

export default globalSetup;