const express = require("express");
const path = require("path");
const fs = require("fs");

const multer = require("multer");
const upload = multer({ dest: "public/" });

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicDir = path.join(__dirname, "public");
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

function getTimeNow() {
    const now = new Date();
    return now.toISOString().replace(/[-T:]/g, "").split(".")[0];
}

function deleteFilesWithPrefix(prefix) {
    fs.readdir(publicDir, (err, files) => {
        if (err) {
            console.error("Error reading directory:", err);
            return;
        }

        files.forEach((file) => {
            if (file.startsWith(prefix)) {
                fs.unlink(path.join(publicDir, file), (err) => {
                    if (err) {
                        console.error("Error deleting file:", err);
                    }
                });
            }
        });
    });
}

app.get("/", (req, res) => {
    res.status(200).send("Welcome");
});

app.post("/addSkin", upload.single("image"), (req, res) => {
    const textData = req.body.text_data;
    const imageFile = req.file;

    // TODO: Prevent file type masquerading attacks
    // Check the file type and handle the upload

    deleteFilesWithPrefix(textData);
    const imgName = `${textData}-${getTimeNow()}.png`;
    const filePath = path.join(publicDir, imgName);

    fs.rename(imageFile.path, filePath, (err) => {
        if (err) {
            console.error("Error saving file:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.status(200).json({ url: `skin/${imgName}` });
    });
});

app.get("/skin/:image_name", (req, res) => {
    const imageName = req.params.image_name;
    if (
        imageName.endsWith(".png") &&
        !imageName.includes("..") &&
        /^[a-zA-Z0-9]{3,16}-\d{14}\.png$/.test(imageName) &&
        imageName.length >= 22 &&
        imageName.length <= 35
    ) {
        const imagePath = path.join(publicDir, imageName);
        if (fs.existsSync(imagePath)) {
            res.sendFile(imagePath);
        } else {
            res.status(404).send("Not Found");
        }
    } else {
        res.status(403).send("Forbidden");
    }
});

app.listen(6001, () => {
    console.log(`Server is running, you can use your server ip + port (default 6001) to visit this service`);
});
