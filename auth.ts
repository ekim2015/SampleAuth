const bcrypt = require('bcrypt')

app.post('/register', async (req, res, next) => {
    // first check if username is in the database
    let request = {
        username: req.body.username,
        rawPass: req.body.password
    }

    // returns Promise object
    db.any('SELECT 1 FROM userDB WHERE username = ?', [request.username])
        .then((data) => {
            console.log("Username exists.")
            return
        })
        .catch((error) => {
            console.log("Error: ", error)
        })

    // Promise objects may return a value or exception
    bcrypt.hash(request.rawPass, 10).then(function(hash) {
        
    })
    .catch(
        console.log("Password hash failed.")
    )

    console.log("Registration sent.")
});
