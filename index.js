'use strict'

const fs = require('fs')
const csv = require('csv-parse')
const parseBool = require('parseboolean')
const toArray = require('get-stream').array

const transformRow = (r) => {
    if(!r.stationName) r.stationName = null
    if(!r.fromStationName) r.fromStationName = null
    if(!r.fromTrack) r.fromTrack = null
    r.fromPosition = +r.fromPosition
    if(!r.toStationName) r.toStationName = null
    if(!r.toTrack) r.toTrack = null
    r.toPosition = +r.toPosition
    r.samePlatform = parseBool(r.samePlatform)
    return r
}

const positions = () => toArray(
    fs.createReadStream('./data.csv')
    .pipe(csv({columns: true}))
).then((res) => res.map(transformRow))

module.exports = positions
