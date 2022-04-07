const landscapeRoutes = require('./landscapes');


const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send('tjenatjena');
    });

    landscapeRoutes(app, fs);
};

module.exports = appRouter;