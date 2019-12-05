    // window.__ipfsNode.add(Buffer.from(fileReader.result)).then(obj => {
    //     window.__ipfsNode.get(obj[0].hash).then(files => {
    //         console.log(files)
    //     })
    // });
    // ipfs.get(hash).then((files) => {
    //     const file = new Blob([files[0].content], { type: 'application/octet-binary' })
    //     const url = URL.createObjectURL(file);
    //     const link = document.createElement('a');
    //     link.href = url
    //     link.download = this.state.name;
    //     document.body.append(link);
    //     link.click();
    //     link.remove();
            // }).catch(console.log)

export function uploadIpfs(file) {
    Buffer.from(file)
    return new Promise((resolve, reject) => {
        window.__ipfsNode.add(buffer)
            .then(obj => {
                resolve(obj);
            })
            .catch(err => reject(err));
    });
}
// export function getFileFromIpfs(file) {

// }


