// Get references to HTML elements
const textArea = document.getElementById("text-area");
const outputButton = document.getElementById("output-button");
const clearButton = document.getElementById("clear-button");
const outputDiv = document.getElementById("output");
const enableDarkMode = document.getElementById('enable-dark-mode'); // Dark mode toggle button
const aboutButton = document.getElementById("about-button"); // About button
const tutorialButton = document.getElementById("tutorial-button"); // Tutorial button
const pasteButton = document.getElementById("paste-button"); // Paste button
const copyButton = document.getElementById("copy-button"); // Copy button
// const downloadTextButton = document.getElementById("download-text-button"); // New button


let darkModeEnabled = false; // Variable to track the dark mode state
let clipboardText = ""; // Variable to store copied text


// Event listeners
enableDarkMode.addEventListener("click", switchDarkMode);
aboutButton.addEventListener("click", displayAbout);
tutorialButton.addEventListener("click", displayTutorial); // Event listener for Tutorial button
outputButton.addEventListener("click", outputText);
clearButton.addEventListener("click", clearText);
pasteButton.addEventListener("click", pasteText); // Event listener for Paste button
copyButton.addEventListener("click", copyText); // Event listener for Copy button
// downloadTextButton.addEventListener("click", downloadText); // Event listener for download button
// downloadTextButton.addEventListener("click", function () {
//     const text = textArea.value;
//     downloadTextAsText("text_file.txt", text);
// });

// Function to display the about alert
function displayAbout() {
    const message = "Need to temporarily paste text somewhere but feel lazy to create a .txt file with random names and open it in Notepad? \n\n" +
        "This simple browser-based text editor solves that problem for you.";
    alert(message);
}


// Function to display the tutorial alert
function displayTutorial() {
    const message = "This is a tutorial for the buttons located below the text input field.\n\n" +
    "Output: Moves your input text to the bottom text field.\n\n" +
    "Clear: Deletes all the text you've typed.\n\n" +
    "Paste: Pastes your most recently copied text from your clipboard.\n\n" +
    "Copy: Copies the entire text you've typed to your clipboard."
    alert(message);
}

// Function to save and display the text
function outputText() {
    const text = textArea.value;
    outputDiv.textContent = text;
    if (darkModeEnabled) {
        // Change text color to white when dark mode is enabled
        outputDiv.style.color = "white";
        textArea.style.color = "white"; // Change input text color to white
    } else {
        // Revert to the default text color
        outputDiv.style.color = "black";
        textArea.style.color = "black"; // Revert input text color to black
    }
}

// Function to clear the text
function clearText() {
    textArea.value = "";
    outputDiv.textContent = "";
    if (darkModeEnabled) {
        // Change text color to white when dark mode is enabled
        outputDiv.style.color = "white";
        textArea.style.color = "white"; // Change input text color to white
    } else {
        // Revert to the default text color
        outputDiv.style.color = "black";
        textArea.style.color = "black"; // Revert input text color to black
    }
}

// Event listener for toggling dark mode
function switchDarkMode() {
    if (darkModeEnabled) {
        // Disable dark mode
        document.body.classList.remove('dark-mode');
        enableDarkMode.textContent = 'Enable Dark Mode';
        // Revert to the default text color
        outputDiv.style.color = "black";
        textArea.style.color = "black"; // Revert input text color to black
    } else {
        // Enable dark mode
        document.body.classList.add('dark-mode');
        enableDarkMode.textContent = 'Enable Light Mode';
        // Change text color to white when dark mode is enabled
        outputDiv.style.color = "white";
        textArea.style.color = "white"; // Change input text color to white
    }
    darkModeEnabled = !darkModeEnabled; // Toggle dark mode state
};

// Function to paste text from the clipboard
function pasteText() {
    navigator.clipboard.readText()
        .then((copiedText) => {
            textArea.value = copiedText;
            clipboardText = copiedText;
        })
        .catch((error) => {
            console.error("Failed to paste text: ", error);
        });
}

// Function to copy text to the clipboard
function copyText() {
    const text = textArea.value;
    navigator.clipboard.writeText(text)
        .then(() => {
            clipboardText = text;
            console.log("Text copied to clipboard: ", text);
        })
        .catch((error) => {
            console.error("Failed to copy text: ", error);
        });
}

// Function to download the text as a text file
// function downloadText(){  
//     //create a file and put the content, name and type
//     var file = new File(["\ufeff" + textArea.value], 'text_file.txt', {type:"text/plain:charset=UTF-8"});
  
//     //create a ObjectURL in order to download the created file
//     url = window.URL.createObjectURL(file);
  
//     //create a hidden link and set the href and click it
//     var a = document.createElement("a");
//     a.style = "display: none";
//     a.href = url;
//     a.download = file.name;
//     a.click();
//     window.URL.revokeObjectURL(url);
//     document.body.removeChild(a);
//   } 



// Function to download the text as a text file
// function downloadTextAsText() {
//     const text = textArea.value;
//     const blob = new Blob([text], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "text_file.txt";
//     a.style.display = "none";
//     document.body.appendChild(a);
//     a.click();
//     window.URL.revokeObjectURL(url);
//     document.body.removeChild(a);
// }
