// Export an object containing controller methods for the home-related routes
module.exports = {
    // Handle GET requests to the homepage
    getIndex: (req,res)=>{
        // Render the index.ejs view
        res.render('index.ejs')
    },

    // Handle GET requests to the About page
    getAbout: (req,res)=>{
        // Render the about.ejs view
        res.render('about.ejs')
    }
}