// Export an object containing controller methods for the number picker route
module.exports = {
      // Handle GET requests to the random number page
    getIndex: (req,res)=>{
         // Render the number.ejs view
        res.render('number.ejs')
    }
}