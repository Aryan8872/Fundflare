import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const unlinkIfExists = async (filePath) => {
    const fullPath = path.join(__dirname, '..', '..', filePath); // adjust as needed

    try {
        await fs.access(fullPath);
        await fs.unlink(fullPath);
        console.log(`✅ Deleted file: ${filePath}`);
    } catch (err) {
        if (err.code === "ENOENT") {
            console.warn(`⚠️ File not found: ${filePath}`);
        } else {
            console.error(`❌ Failed to delete file: ${filePath}`, err.message);
        }
    }
};

export default unlinkIfExists; 