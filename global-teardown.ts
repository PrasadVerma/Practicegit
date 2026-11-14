import fs from "fs";
import { env } from "process";

function globalTeardown() {
    const storageStatePath = env.STORAGE_STATE_PATH;

    if (!storageStatePath || !fs.existsSync(storageStatePath)) {
        return;
    }

    fs.unlink(storageStatePath, (err: NodeJS.ErrnoException | null)=>{
        if (err && err.code !== "ENOENT") {
            throw err;
        } else {
            console.log("Successfully deleted the storage state file");
        }
    });
}

export default globalTeardown;