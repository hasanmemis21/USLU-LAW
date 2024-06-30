const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

const generateSitemap = async (req, res) => {
    try {
        const links = [
            { url: '/', changefreq: 'daily', priority: 1.0 },
            { url: '/about', changefreq: 'monthly', priority: 0.8 },
            { url: '/services', changefreq: 'monthly', priority: 0.8 },
            { url: '/contact', changefreq: 'monthly', priority: 0.8 },
            // Sitenizdeki diğer sayfaları buraya ekleyin
        ];

        const stream = new SitemapStream({ hostname: `http://${req.headers.host}` });
        const xmlString = await streamToPromise(Readable.from(links).pipe(stream)).then((data) => data.toString());

        res.header('Content-Type', 'application/xml');
        res.send(xmlString);
    } catch (err) {
        console.error(err);
        res.status(500).send('Sitemap generation error');
    }
};

module.exports = {
    generateSitemap
};
