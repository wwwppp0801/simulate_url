"use strict";
const toxiproxyClient = require("toxiproxy-node-client");

const getToxic = (type, attributes) => {
  return new Promise((resolve, reject) => {
    const toxiproxy = new toxiproxyClient.Toxiproxy("http://localhost:8474");
    const proxyBody = {
      listen: "0.0.0.0:8880",
      name: "weixin.wangp.org",
      upstream: "localhost:80"
    };
    toxiproxy.createProxy(proxyBody)
      .then((proxy) => {
        const toxicBody = {
          attributes: attributes,
          type: type
        };
        return proxy.addToxic(new toxiproxyClient.Toxic(proxy, toxicBody));
      })
      .then(resolve)
      .catch(reject);
  });
};

// { attributes: { rate: 1000 },
//   name: 'bandwidth_downstream',
//   stream: 'downstream',
//   toxicity: 1,
//   type: 'bandwidth' }
getToxic("bandwidth", { rate: 3})
  .then((toxic) => console.log(toxic.toJson()))
  .catch(console.error);
