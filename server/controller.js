module.exports = {
    getBoards: (req, res) => {
        req.app.get('db').get_standard_boards()
        .then(boards => res.status(200).send(boards))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    }
}