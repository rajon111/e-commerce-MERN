const fs = require('fs');

const deleteImage = async(userImagePath) =>{
    try {
        await fs.access(userImagePath);
        await fs.unlink(userImagePath);
        console.log("User image was successfully deleted")
    } catch (error) {
        console.error("User image does not exist")
    }
}

module.exports = {deleteImage}