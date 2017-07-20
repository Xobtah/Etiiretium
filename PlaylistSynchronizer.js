/**
 * Created by xobtah on 20/07/17.
 */

let youtube_node = require('youtube-node');
let youtube_mp3_downloader = require('youtube-mp3-downloader');
let async = require('async');

module.exports = function (key, destinationPath) {

    this.mp3 = new youtube_mp3_downloader({
        ffmpegPath: __dirname + '/ffmpeg-3.3.2/ffmpeg',
        outputPath: destinationPath,
        youtubeVideoQuality: 'highest',
        queueParallelism: 2,
        progressTimeout: 2000
    });
    this.youtube = new youtube_node();
    this.youtube.setKey(key);

    this.SyncPlaylist = function (psId, callback) {
        this.youtube.getPlayListsItemsById(psId, 50, (err, res) => {
            let asyncFuncList = [];
            if (err)
                return (callback(err));
            this.mp3.on('error', (err) => callback(err));
            res.items.forEach((item) => {
                asyncFuncList.push((callback) => {
                    this.mp3.download(item.contentDetails.videoId);
                });
            });
            async.parallel(asyncFuncList, callback);
        });
    };

};