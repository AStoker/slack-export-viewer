import gulp from 'gulp';
import through from 'through2';
import request from 'request-promise';
import fs from 'fs';
import path from 'path';

let slackSourceFiles = 'slack-data/original-data/**/*.json';
let outputFileStore = 'slack-data/file-store/';


export default function copySlackFiles() {
    return gulp.src(slackSourceFiles)
    .pipe(through.obj((file, enc, callback) => {
        let slackFile = JSON.parse(file.contents);
        let fileDownloadPromises = [];
        //let filesToDownload = [];

        for (let entry of slackFile) {
            let fileToDownload;
            if (entry.file) {
                //get file.privateDownload
                if (entry.file.url_private_download) {
                    fileToDownload = {
                        metadata: entry.file,
                        file: entry.file.url_private_download
                    };
                }
            } else if (entry.profile) {
                //get profile.imageOriginal or other available
                //save in avatars folder
                let imageToSave = entry.profile.image_original ||
                    entry.profile.image_1024 ||
                    entry.profile.image_512 ||
                    entry.profile.image_192 ||
                    entry.profile.image_72 ||
                    entry.profile.image_48 ||
                    entry.profile.image_32 ||
                    entry.profile.image_24;
                if (imageToSave) {
                    fileToDownload = {
                        metadata: entry,
                        file: imageToSave
                    };
                }
            }

            if (fileToDownload) {
                console.log('Downloading file: ' + fileToDownload.file);

                let outputFile = fileToDownload.file.replace(/https:\/\//, '');
                let fileName = fileToDownload.file.split('/').pop().split('?')[0];
                let fileDirName = outputFileStore + path.dirname(outputFile) + '/';

                makeDirp(fileDirName);

                fileDownloadPromises.push(
                    request({
                        uri: fileToDownload.file,
                        encoding: 'binary'
                    })
                        .then((fileContents) => {
                            return fs.writeFile(`${fileDirName}${fileName}`, fileContents, 'binary', (err) => {
                                if (err) {
                                    console.log('Failed to write file: ' + fileToDownload.file);
                                    console.log(err);
                                }
                                return fs.writeFile(`${fileDirName}metadata-${fileToDownload.metadata.id}.json`, JSON.stringify(fileToDownload.metadata, null, '\t'), 'binary', (err2) => {
                                    if (err2) {
                                        console.log('Failed to write metadata file: ' + fileToDownload.file);
                                        console.log(err2);
                                    }
                                });
                            });
                        })
                        .catch((err) => {
                            console.log('Failed to download file: ' + file);
                            console.log(err);
                        })
                );
            }
        }

        return Promise.all(fileDownloadPromises)
            .then(res => {
                return callback(null, file);
            });

    }))
    .on('end', () => {
    //     Promise.all(fileDownloadPromises)
    //         .then(result => {
    //             console.log('Finished download');
    //             console.log(result);
    //         })
    //         .catch(err => {
    //             console.log('Failed to download all files');
    //             console.log(err);
    //         });
    // });

        //let tempTestDownloads = Array.from(filesToDownload).slice(0, 20);
    //     for (let file of Array.from(filesToDownload)) {
    //         console.log('Downloading file: ' + file);

    //         let outputFile = file.replace(/https:\/\//, '');
    //         let fileName = file.split('/').pop().split('?')[0];
    //         let fileDirName = outputFileStore + path.dirname(outputFile) + '/';

    //         makeDirp(fileDirName);
    //         // console.log(fileDirName);
    //         // console.log(fileName);
    //         // console.log(fileContents);

    //         request({
    //             uri: file,
    //             encoding: 'binary'
    //         })
    //         .then((fileContents) => {
    //             fs.writeFileSync(`${fileDirName}${fileName}`, fileContents, 'binary');
    //         })
    //         .catch((err) => {
    //             console.log('Failed to download file: ' + file);
    //             console.log(err);
    //         });
    //     }
    });
}


function makeDirp(dirPath) {
    dirPath.replace(/^\//, '').split('/').reduce((prev, curr, i) => {
        if (fs.existsSync(prev) === false) {
            fs.mkdirSync(prev);
        }
        return prev + '/' + curr;
    });
}
