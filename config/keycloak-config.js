var session = require('express-session');
var Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {
    clientId: 'nodejs-microservice',
    bearerOnly: true,
    serverUrl: 'http://localhost:8080/auth/realms/Demo-Realm/protocol/openid-connect/token',
    realm: 'Demo-Realm',
    // realmPublicKey: 'ZgmMc7WTenNtSS1QpP6kuykXduHfSdQhurmJUWa5q9k'
    credentials: {
        secret: 'e90cbcba-f112-47c2-8aee-665904c69cbf'
    }
};
// http://localhost:8080/auth/realms/Demo-Realm/protocol/openid-connect/token
function initKeycloak() {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    } 
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};