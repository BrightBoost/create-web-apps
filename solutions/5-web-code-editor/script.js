const codeInput = document.getElementById('codeInput');
const cssInput = document.getElementById('cssInput');
const jsInput = document.getElementById('jsInput');
const preview = document.getElementById('preview');
const themeToggle = document.getElementById('themeToggle');
const languageSelect = document.getElementById('languageSelect');

function updatePreview() {
    const lang = languageSelect.value;

    const doc = preview.contentDocument || preview.contentWindow.document;
    doc.open();

    if (lang === 'html') {
        doc.write(codeInput.value);
    } else if (lang === 'html-css-js') {
        const html = codeInput.value || '';
        const css = `<style>${cssInput.value || ''}</style>`;
        const js = `<script>${jsInput.value || ''}<\/script>`;
        doc.write(`<!DOCTYPE html><html><head>${css}</head><body>${html}${js}</body></html>`);
    }

    doc.close();
}

// Listeners
codeInput.addEventListener('input', updatePreview);
cssInput.addEventListener('input', updatePreview);
jsInput.addEventListener('input', updatePreview);
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', themeToggle.checked);
});
languageSelect.addEventListener('change', () => {
    const mode = languageSelect.value;
    const isCombo = mode === 'html-css-js';

    cssInput.style.display = isCombo ? 'block' : 'none';
    jsInput.style.display = isCombo ? 'block' : 'none';
    codeInput.placeholder = isCombo ? 'Write your HTML here...' : 'Write your HTML page here...';

    updatePreview();
});

// Initial load
updatePreview();
