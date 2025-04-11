export const bufferVideos = function () {
  return new Promise(async (resolve) => {
    let videoMap = {};
    let videos = document.querySelectorAll('video');

    for (let videoElement of videos as any) {
      videoMap[videoElement.id] = {
        fileReader: '',
        url: '',
        blob: '',
        element: videoElement
      };
      videoMap[videoElement.id].url = videoElement.src;
      videoElement.src = '';
    }

    for (let videoID of Object.keys(videoMap)) {
      let videoItem = videoMap[videoID];

      videoItem.blob = await fetch(videoMap[videoID].url).then((r) => r.blob());
      videoItem.fileReader = new FileReader();
      videoItem.fileReader.onload = (e) => {
        let buffer = e.target.result;
        let videoBlob = new Blob([new Uint8Array(buffer)], {
          type: 'video/mp4'
        });
        let url = window.URL.createObjectURL(videoBlob);

        videoItem.element.src = url;

        if (e.loaded >= e.total) {
          videoItem.preload = 'auto';
          videoItem.element.load();
          delete videoMap[videoID];

          if (!Object.keys(videoMap).length) {
            resolve(true);
          }
        }
      };
      videoItem.fileReader.readAsArrayBuffer(videoItem.blob);
    }
  });
};
