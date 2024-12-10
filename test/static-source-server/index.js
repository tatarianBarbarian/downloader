const fastify = require("fastify")({ logger: true });
const path = require("node:path");

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/public/", // optional: default '/'
});

fastify.get("/file", function (req, reply) {
  reply.sendFile("sample.mp3"); // serving path.join(__dirname, 'public', 'myHtml.html') directly
});

// Run the server!
fastify.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});
