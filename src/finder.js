// @flow
const JQL = require('jqljs');

const fieldsEnum = {
  DISTRICT: 'd',
  AMPHOE: 'a',
  PROVINCE: 'p',
  ZIPCODE: 'z',
};


/**
 * From jquery.Thailand.js line 30 - 128
 * Search result by FieldsType
 */
const preprocess = (data) => {
  if (!data[0].length) {
        // non-compacted database
    return data;
  }
// compacted database in hierarchical form of:
// [["province",[["amphur",[["district",["zip"...]]...]]...]]...]
  const expanded = [];
  data.forEach((provinceEntry) => {
    const province = provinceEntry[0];
    const amphurList = provinceEntry[1];
    amphurList.forEach((amphurEntry) => {
      const amphur = amphurEntry[0];
      const districtList = amphurEntry[1];
      districtList.forEach((districtEntry) => {
        const district = districtEntry[0];
        const zipCodeList = districtEntry[1];
        zipCodeList.forEach((zipCode) => {
          expanded.push({
            d: district,
            a: amphur,
            p: province,
            z: zipCode,
          });
        });
      });
    });
  });
  return expanded;
};
const DB = new JQL(preprocess(require('../jquery.Thailand.js/data.json')));

const resolveResultbyField = (type: string, searchStr: string) => {
  let possibles = [];
  try {
    possibles = DB.select('*').where(type)
            .match(`^${searchStr}`)
            .orderBy(type)
            .fetch();
  } catch (e) {
    return [];
  }
  return possibles;
};

exports.resolveResultbyField = resolveResultbyField;
exports.fieldsEnum = fieldsEnum;
