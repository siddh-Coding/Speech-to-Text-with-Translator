const translatePageContent = `
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    />
   
    <link rel="stylesheet" href="Tstyle.css">
  <body class="fade-in">

      <div class="wrapper">
        <div class="text-input">
          <textarea
            spellcheck="false"
            class="from-text"
            placeholder="Enter text"
          ></textarea>
          <textarea
            spellcheck="false"
            readonly
            
            class="to-text"
            placeholder="Translation"
          ></textarea>
        </div>
        <ul class="controls">
          <li class="row from">
            <div class="icons">
              <i id="from" class="fas fa-volume-up"></i>
              <i id="from" class="fas fa-copy"></i>
            </div>
            <select></select>
          </li>
          <li class="exchange"><i class="fas fa-exchange-alt"></i></li>
          <li class="row to">
            <select></select>
            <div class="icons">
              <i id="to" class="fas fa-volume-up"></i>
              <i id="to" class="fas fa-copy"></i>
            </div>
          </li>
        </ul>
      </div>
      <button>Translate Text</button>


`;

const mainPageContent = `
  <p class="heading">Speech to Text</p>
  <div class="options">
    <div class="language">
      <p>Language</p>
      <select name="input-language" id="language"></select>
    </div>
  </div>
  <div class="line"></div>
  <button class="btn record">
    <div class="icon">
      <ion-icon name="mic-outline"></ion-icon>
      <img src="bars.svg" alt="" />
    </div>
    <p>Start Listening</p>
  </button>
  <p class="heading">Result :</p>
  <textarea class="result" disabled ></textarea>
    <p class="interim"></p>
  </div>
  <div class="buttons">
    <button class="btn clear">
      <ion-icon name="trash-outline"></ion-icon>
      <p>Clear</p>
    </button>
    <button class="btn download" disabled>
      <ion-icon name="cloud-download-outline"></ion-icon>
      <p>Download</p>
    </button>
  </div>
  <button class="btn" onclick="navigateTo('/translate')">
    <img src="translate.svg" alt="G-LOGO" />
    <p>Translate</p>
  </button>
  `;




const routes = {
  "/": mainPageContent,
  "/index.html": mainPageContent,
  "/translate": translatePageContent,
};

function navigateTo(path) {
  var val = document.querySelector(".result").value;
  // console.log(val)


  document.body.classList.add("fade-out");
  setTimeout(() => {
    history.pushState({}, path, window.location.origin + path);
    updateContent(path, val);
    document.body.classList.remove("fade-out");
    document.body.classList.add("fade-in");
  }, 1000); // Time should match the transition duration
}

function updateContent(path, text) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = routes[path] || "<h1>404</h1><p>Page not found</p>";
  if (path === "/translate") {
    loadScript("myScript.js");
    document.querySelector(".from-text").value = text;

  }
}

window.onpopstate = () => {
  updateContent(window.location.pathname);
};

// Initialize the content based on the current URL path
updateContent(window.location.pathname);

function loadScript(src) {
  const script = document.createElement("script");
  script.src = src;
  script.type = "module"
  script.async = true;
  document.head.appendChild(script);
}


