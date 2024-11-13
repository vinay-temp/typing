const apiUrl = `https://api.github.com/repos/vinay-temp/textfiles/contents/`;

var tests = document.getElementById("tests");

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch repository contents");
    }
    return response.json();
  })
  .then((data) => {
    data.forEach((file) => {
      let name = file.name.slice(0, -4);
      let url = file.download_url;

      var testCard = document.createElement("div");
      testCard.classList.add("test-card");

      var h3 = document.createElement("h3");
      h3.textContent = name;
      testCard.appendChild(h3);

      var button = document.createElement("a");
      button.classList.add("start-btn");
      button.textContent = "Start";
      button.href = `start.html?src=${url}`;
      button.target = "_blank";
      testCard.appendChild(button);

      tests.appendChild(testCard);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
