'use strict';

const aws = require('aws-sdk');
const AthenaExpress = require('athena-express')

const fetchesDatabase = process.env.DATABASE;
const s3Bucket = process.env.S3_BUCKET
const s3AveragesPrefix = process.env.S3_AVERAGES_PREFIX
const parquetTable = process.env.PARQUET_TABLE

const athenaExpressConfig = {
  aws,
  db: fetchesDatabase,
  s3: `s3://${s3Bucket}/${s3AveragesPrefix}`, //DO I NEED THIS IF DATA ISN'T BEING SAVED TO S3??
  retry: 30000, // wait 30 seconds before re-checking query status
  getStats: true,
  skipResults: true //will this be too much?
};

const athenaExpress = new AthenaExpress(athenaExpressConfig);

console.info('Starting averaging queries function');

exports.handler = async (event, context, callback) => {

  //Run averaging query 
  const avgDailyStnQuery =
    `SELECT country, array_agg(distinct(city)) AS city, 
    array_agg(distinct(location)) AS locations,
    round(coordinates.longitude,5) AS lon,
    round(coordinates.latitude, 5) AS lat,
    date_trunc('day', from_iso8601_timestamp(date_utc)) AS day,
    avg(value) AS average,
    count(value) AS measurement_count,
    round(((count(value) / 24.0) * 100.0)) as percent_reporting,
    parameter as parameter
    FROM ${parquetTable}
    WHERE parameter = 'pm25'
    AND unit = 'µg/m³'
    AND value > 0
    AND value <> 985
    AND averagingperiod.value = 1.0
    AND coordinates.longitude BETWEEN -180 AND 180
    AND coordinates.latitude BETWEEN -90 AND 90
    AND coordinates.latitude <> 0.0
    AND coordinates.longitude <> 0.0
    GROUP BY round(coordinates.longitude,5), round(coordinates.latitude,5), country, date_trunc('day', from_iso8601_timestamp(date_utc)), parameter
    ORDER BY country, city, day`

  try {
    console.info('Running daily station average query')
    let results = await athenaExpress.query(avgDailyStnQuery)

    return callback(null, results)

  } catch (error) {
    return callback(error)
  }

  //TODO: Save averages to database

}
