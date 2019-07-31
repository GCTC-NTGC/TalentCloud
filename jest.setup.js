require("isomorphic-fetch");

let Enzyme = require("enzyme");
let Adapter = require("enzyme-adapter-react-16");

Enzyme.configure({ adapter: new Adapter() });
