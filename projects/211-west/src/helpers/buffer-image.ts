export const bufferImage = function (
  currentUrl: string,
  imageURL: string
): Promise<string> {
  return new Promise(async (resolve) => {
    if (currentUrl) window.URL.revokeObjectURL(currentUrl);
    let imageItem: {
      fileReader: string | FileReader;
      url: string;
      blob: Blob;
    } = {
      fileReader: '',
      url: imageURL,
      blob: '' as unknown as Blob
    };

    // Fetch and buffer the image
    imageItem.blob = await fetch(imageItem.url).then((r) => r.blob());
    imageItem.fileReader = new FileReader();
    imageItem.fileReader.onload = (e) => {
      let buffer: any = e.target?.result;
      if (!buffer) return;
      let imageBlob = new Blob([new Uint8Array(buffer)], {
        type: 'image/jpeg' // Adjust this according to the image type
      });
      let url = window.URL.createObjectURL(imageBlob);

      resolve(url); // Return the blob URL as a string
    };

    imageItem.fileReader.readAsArrayBuffer(imageItem.blob);
  });
};
