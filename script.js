const BIN_ID = "69887a3ed0ea881f40a9f02a";
const API_KEY = "$2a$10$yuGKhJ3i8jEHnM0mUTFLCOvv13.hg0k7baKtz027MOi0QX8vjsrSC";

fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
  headers: {
    "X-Master-Key": API_KEY
  }
})
.then(res => res.json())
.then(res => {
  const d = res.record;

  /* TITLE */
  document.getElementById("title").innerText = d.title;

  /* SUBTITLE */
  document.getElementById("subtitle").innerText = d.subtitle;

  /* AVATAR */
  document.getElementById("avatar").src = d.avatar || "";

  /* BACKGROUND (AMAN, PAKE OVERLAY) */
  /* BACKGROUND AMAN (ANTI PECAH) */
if (d.background) {
  const overlay = document.querySelector(".overlay");
  overlay.style.backgroundImage = `
    linear-gradient(
      180deg,
      rgba(4,8,18,.98),
      rgba(4,8,18,.92)
    ),
    url(${d.background})
  `;
  overlay.style.backgroundSize = "cover";
  overlay.style.backgroundPosition = "center";
  overlay.style.backgroundRepeat = "no-repeat";
}


  /* LINKS */
  const linksDiv = document.getElementById("links");
  linksDiv.innerHTML = "";

  d.links.forEach((link, i) => {
    const a = document.createElement("a");
    a.href = link.url;
    a.target = "_blank";
    a.className = "link" + (i === 0 ? " primary" : "");

    a.innerHTML = `
      <img src="${link.icon || ''}" alt="">
      <span>${link.label}</span>
    `;

    linksDiv.appendChild(a);
  });
})
.catch(err => {
  console.error("Gagal load data:", err);
});
