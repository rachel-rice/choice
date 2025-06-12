// Export an object containing controller methods for the flip route
module.exports = {
    // Handle GET requests to the flip page
    getIndex: (req,res)=>{
        // Render the 'flip.ejs' view when the route is accessed
        res.render('flip.ejs')
    }
}