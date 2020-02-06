var buildMode = (function() {
    if (process.env.NODE_ENV === 'production') {
        return 'production';
    } else {
        return 'development';
    }
})();

module.exports = {
    entry: './index.js',
    output: {
        filename: 'simvirus.min.js'
    },
    mode: buildMode
}