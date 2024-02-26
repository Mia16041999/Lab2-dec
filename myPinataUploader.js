const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const pinataApiKey = 'ddd441b5e4e41f39b1af';
const pinataSecretApiKey = '12e3058a954387311028743e95e529356f1729daf9c9c2f2ada3d993780fde52';
const websitePath = 'C:/Users/HP/lab-dec';

const uploadToPinata = async () => {
    try {
        const data = new FormData();
        const files = fs.readdirSync(websitePath);
        console.log('Files to upload:', files); // Check the files being read

        files.forEach((file, index) => {
            // Append each file with a unique key
            data.append(`file${index}`, fs.createReadStream(path.join(websitePath, file)), file);
        });

        const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
            maxBodyLength: 'Infinity', // Add this line to handle large content
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
            }
        });

        console.log('Uploaded to IPFS:', res.data);
    } catch (error) {
        console.error('Error uploading to Pinata:', error);
    }
};

uploadToPinata();
