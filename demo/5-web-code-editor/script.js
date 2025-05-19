// script.js

const codeInput = document.getElementById('codeInput');
const preview = document.getElementById('preview');
const themeToggle = document.getElementById('themeToggle');

// Update the live preview
function updatePreview() {
    const content = codeInput.value;
    const doc = preview.contentDocument || preview.contentWindow.document;
    doc.open();
    doc.write(content);
    doc.close();
}

// Listen to changes in the textarea
codeInput.addEventListener('input', updatePreview);

// Toggle dark mode
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', themeToggle.checked);
});

// Initial preview
updatePreview();
