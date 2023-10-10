const mdwApiConnectToServer = (req, res, next) => {
    const curentData = new Date().toString();
    console.log(`Api connect at ${curentData}`)

    next()
}
export default mdwApiConnectToServer