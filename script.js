const uploadContainer = document.querySelector('.file-upload-container');
const hiddenFileInput = document.querySelector('.hidden-file-input');
const uploadIcon = document.querySelector(".upload-icon")
const uploadText = document.querySelector('.upload-text');
const optionalButtons = document.querySelector('.optional-buttons');
const removeButton = document.querySelector('.remove-button');
const changeButton = document.querySelector('.change-button');


/* per evitare che tutta la finestra sia sensibile al drop */

window.addEventListener("drop", (e) => {
    if([...e.dataTransfer.items].some((item) => item.kind === "file")) {
        e.preventDefault();
    }
}
)

/* per evitare che l'utente veda il simbolo di divieto se prova a passare il file in qualunque altra parte della finestra */

window.addEventListener("dragover", (e) => {
    const fileItems = [...e.dataTransfer.items].filter((item) => item.kind === "file")
    if(fileItems.length > 0) {
        e.preventDefault();
        if (!uploadContainer.contains(e.target)) {
            e.dataTransfer.dropEffect = "none"
        }
    }

})

/* per cambiare l'icona del mouse se il file è droppabile nella dropzone */

uploadContainer.addEventListener("dragover", (e) => {
    const fileItems = [...e.dataTransfer.items].filter((item) => item.kind === "file")
    if(fileItems.length > 0) {
        e.preventDefault();
        if(fileItems.some((item) => item.type.startsWith("image/"))) {
            e.dataTransfer.dropEffect = "copy";
        } else {
            e.dataTransfer.dropEffect = "none"
        }
    }

})


/* per mostrare l'anteprima di immagine e le opzioni di "remove" e "change" */

function displayImages(files) {
    for (const file of files) {
        if(file.type.startsWith("image/")) {
            uploadIcon.src = URL.createObjectURL(file);
            uploadIcon.alt = file.name
        }
    }
    optionalButtons.style.display = "block"
}

/* per la gestione dietro le quinte del file, i file possono essere modificati solo tramite dataTransfer */

function dropHandler(ev) {
    ev.preventDefault();
    const files = [...ev.dataTransfer.items]
    .map((item) => item.getAsFile())
    .filter((file) => file)
    if (files.length > 0){
    displayImages([files[0]])
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add([files[0]])
    hiddenFileInput.files = dataTransfer.files}
}

/* il listener per il cambio che permette la visione dell'anteprima immagine e bottoni opzionali */

uploadContainer.addEventListener("change", (e) => {
    displayImages(e.target.files)
})

/* il listener per il drop e la gestione del file */

uploadContainer.addEventListener("drop", dropHandler)

/* listener e handler dei buttons opzionali */

removeButton.addEventListener("click", () => {
    hiddenFileInput.value = "";
    uploadIcon.src = "./assets/images/icon-upload.svg";
    uploadIcon.alt = "upload icon"
    optionalButtons.style.display = "none"
})
changeButton.addEventListener("click", () => hiddenFileInput.click())
