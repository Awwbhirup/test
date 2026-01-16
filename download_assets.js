const fs = require('fs');
const https = require('https');
const path = require('path');

const destDir = path.join(__dirname, 'public', 'assets', 'external');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const assets = [
    { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe', name: 'texture.jpg' },
    { url: 'https://images.unsplash.com/photo-1574169208507-84376144848b', name: 'cyberpunk-city.jpg' },
    { url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b', name: 'code-abstract.jpg' }
];

assets.forEach(asset => {
    const file = fs.createWriteStream(path.join(destDir, asset.name));
    https.get(asset.url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(() => {
                console.log(`Downloaded ${asset.name}`);
            });
        });
    }).on('error', function(err) {
        fs.unlink(path.join(destDir, asset.name));
        console.error(`Error downloading ${asset.name}: ${err.message}`);
    });
});
