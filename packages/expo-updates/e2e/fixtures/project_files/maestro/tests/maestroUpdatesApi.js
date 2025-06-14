const serverBaseUrl = 'http://localhost:4747';

function serveManifest(name, platform) {
  var requestString = `${serverBaseUrl}/serve-manifest?name=${name}&platform=${platform}`;
  http.get(requestString);
}

function lastRequestHeaders() {
  var requestString = `${serverBaseUrl}/last-request-headers`;
  const response = http.get(requestString);
  return JSON.parse(response.body);
}

function stopUpdatesServer() {
  http.get(`${serverBaseUrl}/stop-server`);
}

function restartUpdatesServer() {
  http.get(`${serverBaseUrl}/restart-server`);
  // Delay 0.5 second to allow server restart to complete
  http.get(`${serverBaseUrl}/delay?ms=500`);
}

function delay(ms) {
  http.get(`${serverBaseUrl}/delay?ms=${ms}`);
}

output.api = {
  delay: delay,
  lastRequestHeaders: lastRequestHeaders,
  restartUpdatesServer: restartUpdatesServer,
  serveManifest: serveManifest,
  stopUpdatesServer: stopUpdatesServer,
};
