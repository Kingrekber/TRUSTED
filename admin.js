const BIN_ID = "69887a3ed0ea881f40a9f02a";
const API_KEY = "$2a$10$yuGKhJ3i8jEHnM0mUTFLCOvv13.hg0k7baKtz027MOi0QX8vjsrSC";

let currentData = null;

/* TOAST */
function toast(msg) {
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.style.opacity = 1;
  setTimeout(() => t.style.opacity = 0, 2500);
}

/* LOAD DATA */
fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
  headers: { "X-Master-Key": API_KEY }
})
.then(res => res.json())
.then(res => {
  currentData = res.record;
  loadMain();
  renderLinks();
});

/* MAIN SETTINGS */
function loadMain() {
  title.value = currentData.title;
  subtitle.value = currentData.subtitle;
  avatar.value = currentData.avatar || "";
  background.value = currentData.background;
}

function saveMain() {
  currentData.title = title.value;
  currentData.subtitle = subtitle.value;
  currentData.avatar = avatar.value;
  currentData.background = background.value;
  updateBin("Pengaturan utama disimpan ✔");
}

/* LINKS */
function renderLinks() {
  const box = document.getElementById("links");
  box.innerHTML = "";

  currentData.links.forEach((l, i) => {
    const div = document.createElement("div");
    div.className = "link-item";

    div.innerHTML = `
      <div class="icon-preview">
        <img src="${l.icon || ''}">
        <small>Icon Preview</small>
      </div>

      <input value="${l.label}" disabled placeholder="Nama Link">
      <input value="${l.url}" disabled placeholder="URL Link">
      <input value="${l.icon || ''}" disabled placeholder="Icon URL">

      <div class="actions">
        <button class="edit" onclick="enableEdit(${i})">Edit</button>
        <button class="save" onclick="saveLink(${i})">Simpan</button>
        <button class="delete" onclick="deleteLink(${i})">Hapus</button>
      </div>
    `;

    box.appendChild(div);
  });
}

function enableEdit(i) {
  document
    .getElementsByClassName("link-item")[i]
    .querySelectorAll("input")
    .forEach(inp => inp.disabled = false);
}

function saveLink(i) {
  const card = document.getElementsByClassName("link-item")[i];
  const inputs = card.querySelectorAll("input");

  currentData.links[i] = {
    label: inputs[0].value,
    url: inputs[1].value,
    icon: inputs[2].value
  };

  updateBin("Link disimpan ✔");
}

function deleteLink(i) {
  if (!confirm("⚠️ Yakin ingin menghapus link ini?\nAksi tidak bisa dibatalkan.")) return;
  currentData.links.splice(i, 1);
  updateBin("Link dihapus 🗑");
}

function addLink() {
  currentData.links.push({
    label: "LINK BARU",
    url: "#",
    icon: ""
  });
  updateBin("Link baru ditambahkan ➕");
}

/* UPDATE JSONBIN */
function updateBin(msg) {
  fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY
    },
    body: JSON.stringify(currentData)
  })
  .then(() => {
    renderLinks();
    toast(msg);
  })
  .catch(() => toast("❌ Gagal menyimpan"));
}
