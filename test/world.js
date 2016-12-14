/* global describe it expect */
var api = require('../app')
var request = require('supertest-as-promised')(api)

describe('Route world', () => {
  describe('GET /world?type=getCountries', () => {
    it('should get all countrys', (done) => {
      request.get('/world')
        .set('Accept', 'application/json')
        .query({type: 'getCountries'})
        .expect(200)
        .expect('Content-Type', /application\/json/)
      .then(res => {
        var body = res.body

        expect(body).to.have.property('status', 'success')
        expect(body).to.have.property('tp', 1)
        expect(body).to.have.property('msg', 'Countries fetched successfully.')
        expect(body).to.have.property('result')
        var result = body.result

        expect(result).to.be.an('object')
        done()
      })
      .catch(done)
    })
  })

  describe('GET /world?type=getStates&countryId=142', () => {
    it('should get all states from country getStates&countryId=142', (done) => {
      request.get('/world')
        .set('Accept', 'application/json')
        .query({type: 'getStates'})
        .query({countryId: 142})
        .expect(200)
        .expect('Content-Type', /application\/json/)
      .then(res => {
        var body = res.body

        expect(body).to.have.property('status', 'success')
        expect(body).to.have.property('tp', 1)
        expect(body).to.have.property('msg', 'Countries fetched successfully.')
        expect(body).to.have.property('result')
        var result = body.result

        expect(result).to.be.an('object')
        done()
      })
      .catch(done)
    })
  })

  describe('GET /world?type=getCities&stateId=2458', () => {
    it('should get all cities from state 2458 (Yucatan)', (done) => {
      request.get('/world')
        .set('Accept', 'application/json')
        .query({type: 'getCities'})
        .query({stateId: 2458})
        .expect(200)
        .expect('Content-Type', /application\/json/)
      .then(res => {
        var body = res.body

        expect(body).to.have.property('status', 'success')
        expect(body).to.have.property('tp', 1)
        expect(body).to.have.property('msg', 'Countries fetched successfully.')
        expect(body).to.have.property('result')
        var result = body.result

        expect(result).to.be.an('object')
        done()
      })
      .catch(done)
    })
  })
})
