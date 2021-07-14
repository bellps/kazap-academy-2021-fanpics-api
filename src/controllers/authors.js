const httpStatus = require('http-status')
const { Author } = require('../models')

const methods = {
  // uma action!
  async list(request, response) {
    const author = new Author()

    try {
      const authors = await author.list()

      response.status(httpStatus.OK).json(authors)
    } catch (err) {
      response.status(httpStatus.INTERNAL_SERVER_ERROR).json(err)
    }
  },

  async create(request, response) {
    const { firstName, lastName, bornAt } = request.body

    const author = new Author()

    if(!firstName || !lastName) {
      return response.status(httpStatus.BAD_REQUEST).json({
        error: 'The fields "firstName" and "lastName" are both required! 😠'
      })
    }

    try {
      const insertedObject = await author.insertOne({
        firstName,
        lastName,
        bornAt: new Date(bornAt),
        createdAt: Date.now(),
        updatedAt: Date.now()
      })

      response.status(httpStatus.CREATED).json(insertedObject)
    } catch (err) {
      response.status(httpStatus.INTERNAL_SERVER_ERROR).json(err)
    }
  }
}

module.exports = methods