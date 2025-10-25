// sitemap-generator.js
import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import { resolve } from "path";

const sitemap = new SitemapStream({
  hostname: "https://kemenag-pematangsiantar.com",
});

sitemap.write({ url: "/", changefreq: "weekly", priority: 1.0 });
sitemap.write({ url: "/profil", changefreq: "monthly", priority: 0.8 });
sitemap.write({ url: "/berita", changefreq: "daily", priority: 0.9 });

sitemap.end();

const writePath = resolve("public/sitemap.xml");

streamToPromise(sitemap).then((data) => {
  const fileStream = createWriteStream(writePath);
  fileStream.write(data.toString());
  fileStream.end();
  console.log("✅ Sitemap generated at:", writePath);
});


