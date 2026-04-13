import sharp from "sharp";
import { readdir, stat, unlink } from "fs/promises";
import { join, extname, basename, dirname } from "path";

const PUBLIC_DIR = "public";
const MAX_WIDTH = 1920;
const QUALITY = 80;
const IMAGE_EXTS = [".png", ".jpg", ".jpeg", ".webp"];

async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findImages(fullPath)));
    } else if (IMAGE_EXTS.includes(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function getSize(filePath) {
  const s = await stat(filePath);
  return s.size;
}

function formatKB(bytes) {
  return (bytes / 1024).toFixed(1) + " KB";
}

async function main() {
  const images = await findImages(PUBLIC_DIR);
  console.log(`\nFound ${images.length} images to optimize\n`);
  console.log("─".repeat(80));
  console.log(
    "File".padEnd(55) + "Before".padStart(10) + "After".padStart(10) + "Saved".padStart(8)
  );
  console.log("─".repeat(80));

  let totalBefore = 0;
  let totalAfter = 0;

  for (const imgPath of images) {
    const beforeSize = await getSize(imgPath);
    totalBefore += beforeSize;

    const ext = extname(imgPath).toLowerCase();
    const dir = dirname(imgPath);
    const name = basename(imgPath, extname(imgPath));
    const outPath = join(dir, name + ".webp");

    try {
      const metadata = await sharp(imgPath).metadata();
      let pipeline = sharp(imgPath);

      // Resize if wider than MAX_WIDTH
      if (metadata.width && metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
      }

      // Convert to WebP
      await pipeline.webp({ quality: QUALITY }).toFile(outPath);

      const afterSize = await getSize(outPath);
      totalAfter += afterSize;

      // Remove original if it's not already .webp
      if (ext !== ".webp") {
        await unlink(imgPath);
      } else if (imgPath !== outPath) {
        // If already webp but re-optimized, remove old
        // outPath === imgPath in this case, so skip
      }

      const saved = ((1 - afterSize / beforeSize) * 100).toFixed(0);
      const displayPath = imgPath.replace(/\\/g, "/");
      console.log(
        displayPath.padEnd(55) +
          formatKB(beforeSize).padStart(10) +
          formatKB(afterSize).padStart(10) +
          (saved + "%").padStart(8)
      );
    } catch (err) {
      console.log(`  ❌ Error processing ${imgPath}: ${err.message}`);
      totalAfter += beforeSize;
    }
  }

  console.log("─".repeat(80));
  console.log(
    "TOTAL".padEnd(55) +
      formatKB(totalBefore).padStart(10) +
      formatKB(totalAfter).padStart(10) +
      (((1 - totalAfter / totalBefore) * 100).toFixed(0) + "%").padStart(8)
  );
  console.log("");
}

main().catch(console.error);
