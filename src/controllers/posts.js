const methods = {
  // uma action!
  async list(request, response) {
    response.status(200).json({
      title: 'Kazap Academy 2021'
    })
  }
}

module.exports = methods