const uploadContainer = document.querySelector('.file-upload-container');
const hiddenFileInput = document.querySelector('.hidden-file-input');
const uploadText = document.querySelector('.upload-text');
const optionalButtons = document.querySelector('.optional-buttons');
const removeButton = document.querySelector('.remove-button');
const changeButton = document.querySelector('.change-button');

const updateUploadText = (file) => {
    uploadText.textContent = file? file.name : uploadText.textContent;
}

uploadContainer.addEventListener("dragenter", function(e) {
    e.preventDefault;
    e.target.style.border = "2px solid white"
})

uploadContainer.addEventListener("dragover", (e) => {
    e.preventDefault;
})

uploadContainer.addEventListener("dragend", (e) => {
    e.preventDefault;   
    e.target.style.border = "none"
})

const handleFiles = (files) => {
    if (!files) {
        return
    }


}