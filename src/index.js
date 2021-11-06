import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import routers from './components/Routers.js'

const PORT = 3000;
const app = express();

dotenv.config();

app.use(bodyParser.json({
    limit: '50mb'
}))
app.use(bodyParser.urlencoded({
    extended: true
}))

for (const router of routers) {
    app.use(router.path, router.router)
}

app.listen(PORT, () => {
    console.log(`App is listening in http://localhost:${PORT}`);
})