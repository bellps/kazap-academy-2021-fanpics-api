const request = require('supertest')
const faker = require('faker')
const httpStatus = require('http-status')
const app = require('../../src/app')

const baseURL = '/posts'

let _id

beforeAll(async () => {
  const response = await request(app).post(baseURL).send({
    title: faker.lorem.sentence(),
    description: faker.lorem.sentences(),
    url: faker.internet.url()
  })

  _id = response.body.insertedId
})

describe('Authors controller', () => {
  describe('List', () => {
    it('When list end point is called', async () => {
      const response = await request(app).get(baseURL)

      expect(response.statusCode).toBe(httpStatus.OK)
    })
  })

  describe('Create', () => {
    it('When create end point is called', async () => {
      const title = faker.lorem.sentence()
      const description = faker.lorem.sentences()
      const url = faker.internet.url()

      const response = await request(app).post(baseURL).send({ title, description, url })

      expect(response.statusCode).toBe(httpStatus.CREATED)
    })
  })

  describe('Show', () => {
    it('When show end point is called', async () => {
      const response = await request(app).get(`${baseURL}/${_id}`)

      expect(response.statusCode).toBe(httpStatus.OK)
    })
  })

  describe('Update', () => {
    it('When update end point is called', async () => {
      const newTitle = faker.lorem.sentence()
      const newDescription = faker.lorem.sentences()
      const newUrl = faker.internet.url()

      const response = await request(app).patch(`${baseURL}/${_id}`).send({
        title: newTitle, description: newDescription, url: newUrl
      })

      expect(response.statusCode).toBe(httpStatus.OK)
      expect(response.body.value.title).toBe(newTitle)
      expect(response.body.value.description).toBe(newDescription)
      expect(response.body.value.url).toBe(newUrl)
    })
  })

  describe('Destroy', () => {
    it('When delete end point is called', async () => {

      const response = await request(app).delete(`${baseURL}/${_id}`)

      expect(response.statusCode).toBe(httpStatus.NO_CONTENT)
    })
  })
})