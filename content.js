function fillPageInputs() {
  const positiveWords = [
    "Excellent",
    "Great",
    "Amazing",
    "Awesome",
    "Positive",
    "Happy",
    "Good",
    "Satisfied",
  ];
  const emails = [
    "test@example.com",
    "hello@demo.com",
    "test@123.com",
    "test123@demo",
    "admin@123.com",
    "admin123@demo.com",
    "support@demo.com",
    "user@123.com",
    "user123@demo.com",
  ];

  // Helper functions
  function getRandomWord() {
    return positiveWords[Math.floor(Math.random() * positiveWords.length)];
  }

  function getRandomEmail() {
    return emails[Math.floor(Math.random() * emails.length)];
  }

  function getRandomPassword() {
    return Math.random().toString(36).slice(-8) + "A1!";
  }

  function getRandomSentence() {
    return positiveWords.join(" ") + ".";
  }

  // Get all inputs and selects
  const inputs = document.querySelectorAll("input, textarea, select");

  inputs.forEach((input) => {
    const type = input.type
      ? input.type.toLowerCase()
      : input.tagName.toLowerCase();

    if (type === "text") input.value = getRandomWord();
    else if (type === "email") input.value = getRandomEmail();
    else if (type === "password") input.value = getRandomPassword();
    else if (type === "textarea") input.value = getRandomSentence();
    else if (type === "select-one") {
      for (let i = 0; i < input.options.length; i++) {
        if (input.options[i].value.trim() !== "") {
          input.selectedIndex = i;
          break;
        }
      }
    } else if (type === "select-multiple") {
      for (let i = 0; i < input.options.length; i++) {
        if (input.options[i].value.trim() !== "") {
          input.options[i].selected = true;
        }
      }
    } else if (type === "checkbox") {
      input.checked = true;
    } else if (type === "radio") {
      input.checked = true;
    } else if (type === "date") {
      input.value = new Date().toISOString().split("T")[0];
    } else if (type === "time") {
      input.value = new Date().toISOString().split("T")[1].split(".")[0];
    } else if (type === "datetime-local") {
      input.value =
        new Date().toISOString().split("T")[0] +
        "T" +
        new Date().toISOString().split("T")[1].split(".")[0];
    } else if (type === "number") {
      input.value = Math.floor(Math.random() * 100);
    } else if (type === "range") {
      input.value = Math.floor(Math.random() * 100);
    } else if (type === "color") {
      input.value = "#" + Math.floor(Math.random() * 16777215).toString(16);
    } else if (type === "file") {
      input.value = "file.txt";
    } else {
      console.log("Unsupported input type: " + type);
    }
  });
}

// Expose the function to be callable from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fillPage") {
    fillPageInputs();
    sendResponse({ status: "done" });
  }
});
