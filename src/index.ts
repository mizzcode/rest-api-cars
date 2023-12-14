import App from './app'

const port = 4000

new App().app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
