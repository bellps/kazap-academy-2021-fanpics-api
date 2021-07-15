const httpStatus = require('http-status')
const { Author } = require('../models')
const { safeObjectId } = require('../helpers')

const methods = {
  // uma action!
  async list(request, response) {
    const author = new Author()

    try {
      const authors = await author.list({ deletedAt: { $exists: false } })

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
  },

  async show(request, response) {
    const { id } = request.params
    const convertedObjectId = safeObjectId(id)

    const author = new Author()

    try {
      const authorToReturn = await author.findOne({ _id: convertedObjectId })

      response.status(httpStatus.OK).json(authorToReturn)
    } catch (err) {
      response.status(httpStatus.INTERNAL_SERVER_ERROR).json(err)
    }
  },

  async update(request, response) {
    const { id } = request.params
    const convertedObjectId = safeObjectId(id)
    const { firstName, lastName, bornAt } = request.body

    if (!firstName || !lastName) {
        return response.status(httpStatus.BAD_REQUEST).json({ error: 'The fields "firstName" and "lastName" are both required.' })
    }

    const author = new Author()

    try {
        const updatedObject = await author.updateOne({ _id: convertedObjectId }, { firstName, lastName, bornAt: new Date(bornAt), updated: Date.now() })

        response.status(httpStatus.OK).json(updatedObject)
    } catch (err) {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).json({"erro": err})
    }
  },

  async destroy(request, response) {
    const { id } = request.params
    const convertedObjectId = safeObjectId(id)

    const author = new Author()

    try {
        const destroyedObject = await author.updateOne({ _id: convertedObjectId }, { deletedAt: Date.now() })

        response.status(httpStatus.NO_CONTENT).json()
    } catch (error) {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }
}

module.exports = methods