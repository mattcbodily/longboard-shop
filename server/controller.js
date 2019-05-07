module.exports = {
    getBoards: (req, res) => {
        req.app.get('db').get_standard_boards()
        .then(boards => res.status(200).send(boards))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    filterLowestPrice: (req, res) => {
       req.app.get('db').filter_lowest_price()
       .then(boards => res.status(200).send(boards))
       .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err))) 
    },
    filterHighestPrice: (req, res) => {
        req.app.get('db').filter_highest_price()
        .then(boards => res.status(200).send(boards))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    filterSizeSmall: (req, res) => {
        req.app.get('db').filter_size_small()
        .then(boards => res.status(200).send(boards))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getSelectedBoard: (req, res) => {
        const {title} = req.params;
        req.app.get('db').get_selected_board(title)
        .then(board => res.status(200).send(board))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    }
}