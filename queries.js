'use strict'

const parquetTable = process.env.PARQUET_TABLE

module.exports = {
    locationDayQuery: `SELECT country, array_agg(distinct(city)) AS city, 
    array_agg(distinct(location)) AS locations,
    round(coordinates.longitude,5) AS lon,
    round(coordinates.latitude, 5) AS lat,
    date_trunc('day', from_iso8601_timestamp(date_utc)) AS date_utc,
    avg(value) AS average,
    count(value) AS measurement_count,
    parameter as parameter,
    unit AS unit,
    'location' AS spatial,
    'day' AS temporal 
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
    GROUP BY round(coordinates.longitude,5), round(coordinates.latitude,5), country, date_trunc('day', from_iso8601_timestamp(date_utc)), parameter, unit
    ORDER BY country, city, date_utc`,

    locationMonthQuery: `SELECT country, array_agg(distinct(city)) AS city, 
    array_agg(distinct(location)) AS locations,
    round(coordinates.longitude,5) AS lon,
    round(coordinates.latitude, 5) AS lat,
    date_trunc('month', from_iso8601_timestamp(date_utc)) AS date_utc,
    avg(value) AS average,
    count(value) AS measurement_count,
    parameter as parameter,
    unit AS unit,
    'location' AS spatial,
    'month' AS temporal 
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
    GROUP BY round(coordinates.longitude,5), round(coordinates.latitude,5), country, date_trunc('month', from_iso8601_timestamp(date_utc)), parameter, unit
    ORDER BY country, city, date_utc`,

    locationYearQuery: `SELECT country, array_agg(distinct(city)) AS city, 
    array_agg(distinct(location)) AS locations,
    round(coordinates.longitude,5) AS lon,
    round(coordinates.latitude, 5) AS lat,
    date_trunc('year', from_iso8601_timestamp(date_utc)) AS date_utc,
    avg(value) AS average,
    count(value) AS measurement_count,
    parameter as parameter,
    unit AS unit,
    'location' AS spatial,
    'year' AS temporal 
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
    GROUP BY round(coordinates.longitude,5), round(coordinates.latitude,5), country, date_trunc('year', from_iso8601_timestamp(date_utc)), parameter, unit
    ORDER BY country, city, date_utc`,

    cityDayQuery: `SELECT 
    country,
    array_agg(distinct(city)) AS city,
    date_trunc('day', from_iso8601_timestamp(date_utc)) AS date_utc,
    avg(value) AS average,
    count(value) AS measurement_count,
    parameter AS parameter,
    unit AS unit,
    'city' AS spatial,
    'day' AS temporal 
    FROM fetches_realtime_parquet
    WHERE parameter = 'pm25'
    AND unit = 'µg/m³'
    AND value > 0
    AND value <> 985
    AND averagingperiod.value = 1.0
    AND coordinates.longitude BETWEEN -180 AND 180
    AND coordinates.latitude BETWEEN -90 AND 90
    AND coordinates.latitude <> 0.0
    AND coordinates.longitude <> 0.0
    GROUP BY array_agg(distinct(city)) AS city, country, date_trunc('day', from_iso8601_timestamp(date_utc)), parameter, unit
    ORDER BY country, city, date_utc`,

    cityMonthQuery: `SELECT country, array_agg(distinct(city)) AS city, 
    date_trunc('month', from_iso8601_timestamp(date_utc)) AS date_utc,
    avg(value) AS average,
    count(value) AS measurement_count,
    parameter as parameter,
    unit AS unit,
    'city' AS spatial,
    'month' AS temporal 
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
    GROUP BY array_agg(distinct(city)) AS city, country, date_trunc('month', from_iso8601_timestamp(date_utc)), parameter, unit
    ORDER BY country, city, date_utc`,

    cityYearQuery: `SELECT country,
    array_agg(distinct(city)) AS city,
    date_trunc('year', from_iso8601_timestamp(date_utc)) AS date_utc,
    avg(value) AS average,
    count(value) AS measurement_count,
    parameter AS parameter,
    unit AS unit,
    'city' AS spatial,
    'year' AS temporal 
    FROM fetches_realtime_parquet
    WHERE parameter = 'pm25'
    AND unit = 'µg/m³'
    AND value > 0
    AND value <> 985
    AND averagingperiod.value = 1.0
    AND coordinates.longitude BETWEEN -180 AND 180
    AND coordinates.latitude BETWEEN -90 AND 90
    AND coordinates.latitude <> 0.0
    AND coordinates.longitude <> 0.0
    GROUP BY array_agg(distinct(city)) AS city, country, date_trunc('year', from_iso8601_timestamp(date_utc)), parameter, unit
    ORDER BY country, city, date_utc`,

    countryDayQuery: `SELECT country,
    date_trunc('day', from_iso8601_timestamp(date_utc)) AS date_utc,
    avg(value) AS average,
    count(value) AS measurement_count,
    parameter AS parameter,
    unit AS unit,
    'country' AS spatial,
    'day' AS temporal 
    FROM fetches_realtime_parquet
    WHERE parameter = 'pm25'
    AND unit = 'µg/m³'
    AND value > 0
    AND value <> 985
    AND averagingperiod.value = 1.0
    AND coordinates.longitude BETWEEN -180 AND 180
    AND coordinates.latitude BETWEEN -90 AND 90
    AND coordinates.latitude <> 0.0
    AND coordinates.longitude <> 0.0
    GROUP BY country, date_trunc('day', from_iso8601_timestamp(date_utc)), parameter, unit
    ORDER BY country, date_utc`,

    countryMonthQuery: `SELECT country,
    date_trunc('month', from_iso8601_timestamp(date_utc)) AS date_utc,
    avg(value) AS average,
    count(value) AS measurement_count,
    parameter AS parameter,
    unit AS unit,
    'country' AS spatial,
    'month' AS temporal 
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
    GROUP BY country, date_trunc('month', from_iso8601_timestamp(date_utc)), parameter, unit
    ORDER BY country, date_utc`,

    countryYearQuery: `SELECT country,
    date_trunc('year', from_iso8601_timestamp(date_utc)) AS date_utc,
    avg(value) AS average,
    count(value) AS measurement_count,
    parameter as parameter,
    unit AS unit,
    'country' AS spatial,
    'year' AS temporal 
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
    GROUP BY country, date_trunc('year', from_iso8601_timestamp(date_utc)), parameter, unit
    ORDER BY country, date_utc`
}