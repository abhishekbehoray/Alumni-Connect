document.addEventListener('DOMContentLoaded', function() {
  // ---------- Modal / Batch upload ----------
  const uploadAlumniBtn = document.getElementById("uploadAlumniBtn");
  const uploadModal = document.getElementById("uploadModal");
  const closeModalBtn = uploadModal ? uploadModal.querySelector(".close-modal-btn") : null;
  const doneBtn = document.getElementById("doneBtn");
  const batchListContainer = document.getElementById("batch-list-container");
  const addBatchForm = document.getElementById("addBatchForm");
  const newBatchNameInput = document.getElementById("newBatchName");

  let batches = [];

  // Open modal
  if (uploadAlumniBtn && uploadModal) {
    uploadAlumniBtn.addEventListener("click", () => {
      uploadModal.classList.add("show");
    });
  }

  // Close modal
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      uploadModal.classList.remove("show");
    });
  }
  if (doneBtn) {
    doneBtn.addEventListener("click", () => {
      uploadModal.classList.remove("show");
    });
  }

  // Add batch
  if (addBatchForm) {
    addBatchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const batchName = newBatchNameInput.value.trim();
      if (!batchName) return;
      batches.push({ name: batchName, file: null });
      newBatchNameInput.value = "";
      renderBatchList();
    });
  }

  // Remove batch
  function removeBatch(index) {
    batches.splice(index, 1);
    renderBatchList();
  }

  // Handle file upload
  function handleFileUpload(index, file) {
    batches[index].file = file;
    renderBatchList();
  }

  // Render batch list
  function renderBatchList() {
    if (!batchListContainer) return;
    batchListContainer.innerHTML = "";
    batches.forEach((batch, idx) => {
      const batchDiv = document.createElement("div");
      batchDiv.className = "batch-item";

      // Batch name
      const nameSpan = document.createElement("span");
      nameSpan.className = "batch-name";
      nameSpan.textContent = batch.name;
      batchDiv.appendChild(nameSpan);

      // File input
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".csv";
      fileInput.className = "file-input-hidden";
      fileInput.id = `file-input-${idx}`;

      fileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
          handleFileUpload(idx, e.target.files[0]);
        }
      });

      batchDiv.appendChild(fileInput);

      // File upload label
      const fileLabel = document.createElement("label");
      fileLabel.htmlFor = fileInput.id;
      fileLabel.className = "file-upload-label";
      fileLabel.textContent = batch.file ? "Replace CSV" : "Upload CSV";
      batchDiv.appendChild(fileLabel);

      // File name display
      if (batch.file) {
        const fileNameSpan = document.createElement("span");
        fileNameSpan.className = "file-name-display";
        fileNameSpan.textContent = batch.file.name;
        batchDiv.appendChild(fileNameSpan);
      }

      // Remove batch button
      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-batch-btn";
      removeBtn.innerHTML = "&times;";
      removeBtn.title = "Remove batch";
      removeBtn.addEventListener("click", () => removeBatch(idx));
      batchDiv.appendChild(removeBtn);

      batchListContainer.appendChild(batchDiv);
    });
  }

  // ---------- Profile dropdown (single listener) ----------
  const profileBtn = document.querySelector('.profile-dropbtn');
  const profileDropdown = document.querySelector('.profile-dropdown');

  if (profileBtn && profileDropdown) {
    // Toggle dropdown on click
    profileBtn.addEventListener('click', function(e) {
      e.stopPropagation(); // prevent the document click handler from immediately closing it
      profileDropdown.classList.toggle('open');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (profileDropdown.classList.contains('open') && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.remove('open');
      }
    });
  }

  // ---------- Logout ----------
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'index.html';
    });
  }
});
