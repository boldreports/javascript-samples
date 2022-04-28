const gulp = require('gulp');
const { writeFileSync, readFileSync } = require('fs');

gulp.task('sitemap', (done) => {
    let samples = JSON.parse(readFileSync('./src/controls/samples.json', 'utf8')).samples;
    let baseUrl = 'https://demos.boldreports.com/javascript/';
    let report_viewer = 'report-viewer';
    let report_designer = 'report-designer';
    let dateInstance = new Date();
    let lastModified = `${dateInstance.getFullYear()}-${dateInstance.getDay()}-${dateInstance.getDate()}`;
    let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>

    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    
        <url>

        <loc>${baseUrl + report_designer}/</loc>
  
        <lastmod>${lastModified}</lastmod>
  
        </url>
    \n`;
    samples.forEach((sample) => {
        xmlContent += `        <url>

        <loc>${baseUrl + report_viewer}/${sample.routerPath}/preview/</loc>
  
        <lastmod>${lastModified}</lastmod>
  
        </url>\n`;
    });
    xmlContent += `</urlset>`;
    writeFileSync('./sitmap-javascript-demos.xml', xmlContent, 'utf8');
    done();
});