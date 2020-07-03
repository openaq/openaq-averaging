'use strict';

const queries = require('./queries');
const db = require('./db').db;

//AWS config
const aws = require('aws-sdk');
const AthenaExpress = require('athena-express')

const fetchesDatabase = process.env.DATABASE;
const s3Bucket = process.env.S3_BUCKET
const s3AveragesPrefix = process.env.S3_AVERAGES_PREFIX

const athenaExpressConfig = {
  aws,
  db: fetchesDatabase,
  s3: `s3://${s3Bucket}/${s3AveragesPrefix}`,
  retry: 30000, // wait 30 seconds before re-checking query status
  getStats: true
};
const athenaExpress = new AthenaExpress(athenaExpressConfig);


console.info('Starting averaging queries function');

exports.handler = async (event, context, callback) => {
  try {
    let results = await athenaExpress.query(queries.countryYearQuery)
    console.info(`Query finished and returned with ${results.Count} calculated averages`)

    console.info('Inserting calculations into database...')
    await db.batchInsert('averages', results.Items)

    console.info(`Done! ${results.Count} averages calculated and inserted into database`)
    return 'Done'

  } catch (error) {
    return error
  }

}
