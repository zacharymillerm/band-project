// pages/api/sitemap.xml.js
import { SitemapStream, streamToPromise } from 'sitemap';
import { NextApiRequest, NextApiResponse } from 'next';

// Sample data for the purpose of generating the sitemap
const pages = [
    { loc: '/', lastmod: new Date(), changefreq: 'monthly', priority: 1 },
    { loc: '/technical/light', lastmod: new Date(), changefreq: 'monthly', priority: 0.7 },
    { loc: '/technical/sound', lastmod: new Date(), changefreq: 'monthly', priority: 0.7 },
    { loc: '/technical/videopage', lastmod: new Date(), changefreq: 'monthly', priority: 0.7 },
    { loc: '/technical/stage-clothing', lastmod: new Date(), changefreq: 'monthly', priority: 0.7 },
    { loc: '/services/showdevelopment', lastmod: new Date(), changefreq: 'monthly', priority: 0.7 },
    { loc: '/services/visualization', lastmod: new Date(), changefreq: 'monthly', priority: 0.7 },
    { loc: '/services/rehearsal', lastmod: new Date(), changefreq: 'monthly', priority: 0.7 },
    { loc: '/contact', lastmod: new Date(), changefreq: 'monthly', priority: 0.4 },
    { loc: '/team', lastmod: new Date(), changefreq: 'monthly', priority: 0.4 },
    { loc: '/cases', lastmod: new Date(), changefreq: 'weekly', priority: 0.5 },
    { loc: '/production/event', lastmod: new Date(), changefreq: 'monthly', priority: 0.6 },
    { loc: '/production/tourconcert', lastmod: new Date(), changefreq: 'monthly', priority: 0.6 },
    { loc: '/blog', lastmod: new Date(), changefreq: 'weekly', priority: 0.6 },
    // You can add more pages and fetch them dynamically from your database
];

export default async function handler(req, res) {
    // Create a writable stream
    const sitemapStream = new SitemapStream({ hostname: 'https://zavodshow.ru' });

    // Add each page to the sitemap stream
    pages.forEach(page => {
        sitemapStream.write({
            url: page.loc,
            lastmodISO: page.lastmod,
            changefreq: page.changefreq,
            priority: page.priority,
        });
    });

    // End the stream
    sitemapStream.end();

    // Convert to XML string
    const xmlString = await streamToPromise(sitemapStream).then(data => data.toString());

    // Set response headers
    res.setHeader('Content-Type', 'application/xml');
    res.write(xmlString);
    res.end();
}