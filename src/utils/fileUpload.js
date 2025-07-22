const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../../src/public/uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

exports.uploadFile = async (file, prefix = '') => {
    try {
        const fileName = `${prefix}-${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDir, fileName);

        // Create a write stream and pipe the file data to it
        await fs.promises.writeFile(filePath, file.data);

        // Return the relative path that can be used in URLs
        return `/uploads/${fileName}`;
    } catch (error) {
        console.error('File upload error:', error);
        throw new Error('Error uploading file');
    }
};

exports.deleteFile = async (fileUrl) => {
    try {
        if (!fileUrl) return;

        // Extract filename from URL
        const fileName = fileUrl.split('/').pop();
        const filePath = path.join(uploadDir, fileName);

        // Check if file exists before attempting to delete
        if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
        }
    } catch (error) {
        console.error('File deletion error:', error);
        throw new Error('Error deleting file');
    }
}; 