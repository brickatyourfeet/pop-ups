const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const fs = require('fs');
const UUID = require('uuid-v4')

const gcconfig = {
    projectId: 'popups-1517513406459',
    keyFilename: 'popups.json'
}

const gcs = require('@google-cloud/storage')(gcconfig)

exports.storeImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const body = JSON.parse(request.body)
        fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', err => {
            console.log(err)
            return response.status(500).json({error: err})
        })
        const bucket = gcs.bucket('popups-1517513406459.appspot.com')

        const uuid = UUID()

        bucket.upload('/tmp/uploaded-image.jpg', {
            uploadType: 'media',
            destination: '/popups/' + uuid + '.jpg',
            metadata: {
                metadata: {
                    contentType: 'image/jpeg',
                    firebaseStorageDownloadTokens: uuid
                }
                
            }
        }, (err, file) => {
            if (!err){
                response.status(201).json({
                    imageUrl: 'https://firebasestorage.googleapis.com/v0/b'
                        + bucket.name 
                        + '/o/'
                        + encodeURIComponent(file.name)
                        + '?alt=media&token='
                        + uuid
                })
            } else {
                console.log(err)
                response.status(500).json({error: err})
            }
        })
    })

});
