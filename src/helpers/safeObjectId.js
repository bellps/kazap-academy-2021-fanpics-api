const ObjectId = require('mongodb').ObjectId

const safeObjectId = id => {
  try {
    const convertedId = ObjectId(id)

    return convertedId
  } catch (err) {
    return false
  }
}

module.exports = safeObjectId