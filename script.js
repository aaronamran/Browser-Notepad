// Get references to HTML elements
const textArea = document.getElementById("text-area");
const outputButton = document.getElementById("output-button");
const clearButton = document.getElementById("clear-button");
const outputDiv = document.getElementById("output");
const enableDarkMode = document.getElementById("enable-dark-mode"); // Dark mode toggle button
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

// Function to display the about alert
function displayAbout() {
  const message =
    "Need to temporarily paste text somewhere but feel lazy to create a .txt file with random names and open it in Notepad? \n\n" +
    "This simple browser-based text editor solves that problem for you.";
  alert(message);
}

// Function to display the tutorial alert
function displayTutorial() {
  const message =
    "This is a tutorial for the buttons located below the text input field.\n\n" +
    "Output: Moves your input text to the bottom text field.\n\n" +
    "Clear: Deletes all the text you've typed.\n\n" +
    "Paste: Pastes your most recently copied text from your clipboard.\n\n" +
    "Copy: Copies the entire text you've typed to your clipboard.\n\n" +
    "Download Text as File: Downloads the text you've typed as a file using the specified file name and file extension." ;
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
    document.body.classList.remove("dark-mode");
    enableDarkMode.textContent = "Enable Dark Mode";
    // Revert to the default text color
    outputDiv.style.color = "black";
    textArea.style.color = "black"; // Revert input text color to black
  } else {
    // Enable dark mode
    document.body.classList.add("dark-mode");
    enableDarkMode.textContent = "Enable Light Mode";
    // Change text color to white when dark mode is enabled
    outputDiv.style.color = "white";
    textArea.style.color = "white"; // Change input text color to white
  }
  darkModeEnabled = !darkModeEnabled; // Toggle dark mode state
}

// Function to paste text from the clipboard
function pasteText() {
  navigator.clipboard
    .readText()
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
  navigator.clipboard
    .writeText(text)
    .then(() => {
      clipboardText = text;
      console.log("Text copied to clipboard: ", text);
    })
    .catch((error) => {
      console.error("Failed to copy text: ", error);
    });
}

function downloadFile(filename, content) {
  // It works on all HTML5 Ready browsers as it uses the download attribute of the <a> element:
  const element = document.createElement("a");

  //A blob is a data type that can store binary data
  // "type" is a MIME type
  // It can have a different value, based on a file you want to save
  const blob = new Blob([content], { type: "plain/text" });

  //createObjectURL() static method creates a DOMString containing a URL representing the object given in the parameter.
  const fileUrl = URL.createObjectURL(blob);

  //setAttribute() Sets the value of an attribute on the specified element.
  element.setAttribute("href", fileUrl); //file location
  element.setAttribute("download", filename); // file name
  element.style.display = "none";

  //use appendChild() method to move an element from one element to another
  document.body.appendChild(element);
  element.click();

  //The removeChild() method of the Node interface removes a child node from the DOM and returns the removed node
  document.body.removeChild(element);
}

window.onload = () => {
  document.getElementById("download-button").addEventListener("click", (e) => {
    //The value of the file name input box
    const filename = document.getElementById("filename").value;

    //The value of what has been input in the textarea
    const content = document.getElementById("text-area").value;

    // The && (logical AND) operator indicates whether both operands are true.
    // If both operands have nonzero values, the result has the value 1 . Otherwise, the result has the value 0.
    if (filename && content) {
      downloadFile(filename, content);
    }
  });
};
