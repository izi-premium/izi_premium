const fs = require("fs");
const path = require("path");

async function convertFaviconToBase64() {
  try {
    console.log("🔄 Convirtiendo favicon a base64...");

    const faviconPath = path.join(__dirname, "..", "app", "favicon.png");

    if (!fs.existsSync(faviconPath)) {
      console.error("❌ No se encontró el archivo favicon.png");
      return;
    }

    const imageBuffer = fs.readFileSync(faviconPath);
    const base64String = imageBuffer.toString("base64");
    const dataUrl = `data:image/png;base64,${base64String}`;

    console.log("✅ Favicon convertido a base64!");
    console.log("\n📋 Copia este código y úsalo en email-templates.ts:");
    console.log(`const LOGO_URL = "${dataUrl}";`);
    console.log(`\n📏 Tamaño: ${Math.round(dataUrl.length / 1024)} KB`);
  } catch (error) {
    console.error("❌ Error convirtiendo favicon:", error);
  }
}

convertFaviconToBase64();
