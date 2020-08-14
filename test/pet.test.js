const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const pets = require('../models/pets');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional - pet', () => {

//Create test cases
  it('should fail to create a pet details without a Name', async () => {
    const res = await request(app).post('/pets').send({
      id:1001,
      colour:'White',
      age: 5,
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
  });

  it('should create a pet details', async () => {
    const pets = {
      id:1011,
      name: 'tony',
      colour: 'red',
      age: 6,
    };
    const res = await request(app).post('/pets').send(pets);
    expect(res.status).to.equal(201);
    expect(res.body.id).to.equal(pets.id);
    expect(res.body.name).to.equal(pets.name);
    expect(res.body.colour).to.equal(pets.colour);
    expect(res.body.age).to.equal(pets.age);
  })

  //Before fetching the we should mock some data into the database.
  let pet;
  beforeEach((done)=>{
    pet = new pets({
     id:1028,
     name:'jicku',
     age:2,
     colour:'brown',
   })
  
   pet.save()
      .then(()=>{done();})

  });

  it('Expect data should be based on the input id', async ()=>{
    const res = await request(app).get('/pets/'+1028);
    expect(res.status).to.equal(201);
    expect(res.body.id).to.equal(pet.id);
    expect(res.body.name).to.equal(pet.name);
    expect(res.body.age).to.equal(pet.age);

    expect(res.body.colour).to.equal(pet.colour);
  });

  //Get all data from the database using find().
  it('Get all data from the database', async ()=>{
    const res = await request(app).get('/pets');
    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal("All data fetched from database.")

})

   //Test to Delete all data in the Pets
   it('delete all data from the pets database', async ()=>{
    const res = await request(app).delete('/pets/deletepet');
    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal("Deleted All the pets");

})

//Test to Delete the data based on the input
it('delete data from the pets database based on the input', async ()=>{
  const res = await request(app).delete('/pets/deletepet/'+1028);
  expect(res.status).to.equal(201);
  expect(res.body.message).to.equal("ID:1028 is successfully deleted");

})

});

