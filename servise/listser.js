const axios = require('axios')

exports.homeRoutes = (req, res) => {
              // Make a get request to /api/users
              axios.get('http://localhost:5000/api/users')
                .then(function (response) {
                res.render('admin', { users: response.data })
                })
                .catch(err => {
                  res.send(err)
                })
}