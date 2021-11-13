require("dotenv").config();

// To show an error message on the UI.
function unauth401(res, message) {
    console.log("Error Message = ", message);
    // res.status(401).send(message);
    res.render('unauth401', {
        message: message
    });
};


module.exports.home = (req, res) => {
    return res.json({
        message: "Welcome boy!"
    });
};