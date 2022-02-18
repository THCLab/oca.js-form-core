const { OcaJs, resolveFromZip } = require('oca.js-form-core');
const { renderOCAForm } = require( 'oca.js-form-html');
const fs = require('fs');

(async function() {
  let file = fs.readFileSync("./swiss_passport.zip");
  const oca = await resolveFromZip(file);
  const captureBaseSAI = oca.overlays[0].capture_base
  const ocaJs = new OcaJs({})
  const structure = await ocaJs.createStructure(oca)

  let output = renderOCAForm(structure);
  console.log(output);
}());
