const xml2js = require('xml2js');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const { compareObjects } = require('./CompareLogic');
// const ini = require('ini');
const path = require('path');
const ini = require('ini');
// const path = require('path');

const CompareController = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length < 2) {
      return res.status(400).json({ error: 'At least two XML files are required.' });
    }

    const parser = new xml2js.Parser({
      explicitArray: false,
      mergeAttrs: true,
      explicitRoot: false
    });
    const xmlObjects = [];

    function normalizeEmployees(dept) {
      if (dept.Employee && !Array.isArray(dept.Employee)) {
        dept.Employee = [dept.Employee];
      }
      return dept;
    }

    for (const file of files) {
      const ext = path.extname(file.originalname).toLowerCase();
      const fileData = fs.readFileSync(file.path, 'utf-8');
      let result;

      if (ext === '.xml') {
        result = await parser.parseStringPromise(fileData);
        // Normalize Department.Employee to always be an array
        if (result.Company && Array.isArray(result.Company.Department)) {
          result.Company.Department = result.Company.Department.map(normalizeEmployees);
        } else if (result.Company && result.Company.Department) {
          result.Company.Department = [normalizeEmployees(result.Company.Department)];
        }
      } else if (ext === '.ini') {
        result = ini.parse(fileData);
        // No normalization needed for INI, but you could add it here if desired
      } else {
        await unlinkFile(file.path);
        return res.status(400).json({ error: 'Unsupported file type: ' + ext + '. Only .xml and .ini files are allowed.' });
      }
      xmlObjects.push(result);
      await unlinkFile(file.path); // Clean up uploaded file
    }

    const diffs = compareObjects(xmlObjects);

    res.json({ differences: diffs });
  } catch (err) {
    console.error('CompareController error:', err);
    res.status(500).json({ error: 'Failed to compare XML or INI files', details: err.message });
    res.status(500).json({ error: 'Failed to compare XML files', details: err.message });
  }
};

module.exports = { CompareController };
