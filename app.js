/**
 * Created by xobtah on 20/07/17.
 */

let PlaylistSynchronizer = require('./PlaylistSynchronizer');
let PS = new PlaylistSynchronizer('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU', __dirname);

PS.SyncPlaylist('PL-krOhDZTqOD-x6BHDfWUwBa_Ug_imwW8', (err, data) => {
    console.log(err || data);
});