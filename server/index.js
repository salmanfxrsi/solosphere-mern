const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config()

const port = process.env.PORT || 9000
const app = express()

app.use(cors())
app.use(express.json())

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@main.yolij.mongodb.net/?retryWrites=true&w=majority&appName=Main`
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.upkox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

const jobsCollection = client.db('jobsDB').collection('jobs') 

async function run() {
  try {

    // get job
    app.get('/jobs', async(req,res)=>{
      const result = await jobsCollection.find().toArray();
      res.send(result)
    })

    // post job 
    app.post('/add-job', async(req,res)=>{
      const jobData = req.body;
      const result = await jobsCollection.insertOne(jobData);
      res.send(result);
    })

    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    
  }
}
run().catch(console.dir)
app.get('/', (req, res) => {
  res.send('Hello from SoloSphere Server....')
})

app.listen(port, () => console.log(`Server running on port ${port}`))
