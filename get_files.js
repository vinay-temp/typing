const apiUrl = `https://api.github.com/repos/vinay-temp/textfiles/contents/`;

var tests = document.getElementById("tests");

async function load_test(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("File not found");
    const TEXT = await response.text();

    tests.classList.add("hide");
    document.getElementById("start-test").classList.remove("hide");
    document.getElementById("text1").innerHTML = TEXT;


  } catch (error) {
    console.error("Error loading text:", error);
  }
}

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

      var button = document.createElement("button");
      button.classList.add("start-btn");
      button.textContent = "Start";
      button.onclick = () => load_test(url);

      testCard.appendChild(button);

      tests.appendChild(testCard);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
