
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://zavodshow.ru', // Base URL of your site
  generateRobotsTxt: true, // Generate robots.txt file
  changefreq: 'daily', // Frequency of changes for all pages
  priority: 0.7, // Default priority for all pages
  sitemapSize: 5000, // Maximum URLs per sitemap file
  generateIndexSitemap: true, // Generate index sitemap if there are multiple files
  exclude: ['/api/*', '/admin/*'], // Exclude specific routes
  transform: async (config, path) => {
    // Modify sitemap entries dynamically if needed
    return {
      loc: path, // The URL path
      changefreq: config.changefreq,
      priority: path === '/' ? 1.0 : config.priority, // Priority for the homepage
      lastmod: new Date().toISOString(), // Last modification date
    };
  },
};
