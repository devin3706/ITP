document
  .getElementById("preview-button")
  .addEventListener("click", function () {
    const teacherName = document.getElementById("teacher-name").value;
    const subject = document.getElementById("subject").value;
    const announcement = document.getElementById("announcement").value;

    const previewContent = `
      <h2>Preview</h2>
      <p><strong>Teacher Name:</strong> ${teacherName}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Announcement:</strong></p>
      <p>${announcement}</p>
    `;

    document.getElementById("preview-container").innerHTML = previewContent;
    document.getElementById("preview-overlay").style.display = "block";
  });

document.getElementById("close-preview").addEventListener("click", function () {
  document.getElementById("preview-overlay").style.display = "none";
});
