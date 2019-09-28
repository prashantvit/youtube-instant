#!/usr/bin/env node

const https = require('https');

const API_KEY = 'AIzaSyDgvJKl298TkwpjsB1f0PWqVFhScILAOFc';
const kewword = process.argv[process.argv.length - 1];
https.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${kewword}&key=${API_KEY}`, (resp) => {
  var data = '';
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    const parsed = JSON.parse(data);
    const videosList = parsed.items.filter((item) => !!item.id.videoId);
    const result = videosList.map((video) => ({
      id: video.id.videoId,
      title: video.snippet.title,
    }));
    result.forEach((v, i) => {
      console.log('\x1b[36m%s\x1b[0m', `${i}. Song Title - ${v.title}`);
      console.log('\x1b[33m%s\x1b[0m', `   Song Link - https://youtube.com/watch?v=${v.id}`, '\n');
    });
  });
}).on('error', (err) => {
  console.log(`Error: ${err}`);
});
