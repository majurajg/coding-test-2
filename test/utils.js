const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const port = 27017;
const mongod = new MongoMemoryServer({
  instance: {
    port,
  },
  autoStart: false,
});

const setup = async () => {
  await mongod.start();
  if (mongod.instanceInfoSync.port !== port) throw new Error(`Failed to startup, :${port} already in use`);

  const url="mongodb://127.0.0.1:27017/petsData";
  await mongoose.connect(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

before(async () => {
  await setup();
});
