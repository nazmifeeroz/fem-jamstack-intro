exports.handler = (event, _context, callback) => {
  console.log("event", event)

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      boop: true,
    }),
  })
}
