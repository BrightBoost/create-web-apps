You're doing an amazing job with these projects — and adding **multi-language support** to your **Web Code Editor** is a smart way to make it more powerful and real-world!

---

## ✅ What Do You Mean by "Multi-language Support"?

There are **two possible meanings** — and both are worth exploring:

1. **Interface language support** (i18n) → Translations like English, Dutch, etc.
2. **Code language support** → Allow users to edit and run **HTML**, **CSS**, **JavaScript**, or even **Python**, **Markdown**, etc.

> 🧠 Based on your project, you likely meant **#2** — supporting *multiple code languages* in the editor.

Let’s build that!

---

## ✅ Feature Plan: Support for HTML, CSS, and JavaScript

We'll add:

1. A **dropdown** to select a language
2. A **code input** for each language (or one combined for HTML)
3. A **preview iframe** that updates for supported languages (HTML/CSS/JS)

Later, you can:

* Add Markdown → render with `marked.js`
* Add Python → send to a backend or use something like Pyodide

---

## 🛠 Step-by-Step Implementation (HTML, CSS, JS)

---

### ✅ Step 1: Add Language Selector to HTML

Update your `index.html` inside the `.controls` div:

```html
<div class="controls">
    <label for="themeToggle">
        <input type="checkbox" id="themeToggle" /> Dark Mode
    </label>
    <label for="languageSelect">
        Language:
        <select id="languageSelect">
            <option value="html" selected>HTML</option>
            <option value="html-css-js">HTML + CSS + JS</option>
        </select>
    </label>
</div>
```

And below `.controls`, update `.editor-wrapper` to:

```html
<div class="editor-wrapper">
    <textarea id="codeInput" placeholder="Write your HTML here..."></textarea>

    <!-- Extra editors for CSS/JS combo -->
    <textarea id="cssInput" placeholder="Write your CSS here..." style="display: none;"></textarea>
    <textarea id="jsInput" placeholder="Write your JS here..." style="display: none;"></textarea>

    <iframe id="preview" title="Live Preview"></iframe>
</div>
```

---

### ✅ Step 2: Update `script.js`

Replace your `script.js` with the following:

```js
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
```

---

### ✅ Step 3: (Optional) Add Styles for Multiple Editors

Update your `style.css` to make the layout pretty:

```css
textarea {
    width: 100%;
    height: 200px;
    padding: 16px;
    font-size: 16px;
    font-family: monospace;
    border: 1px solid #ccc;
    border-radius: 8px;
    resize: vertical;
    background-color: #ffffff;
    color: #1d2226;
    transition: background-color 0.3s ease, color 0.3s ease;
    margin-bottom: 12px;
}

.editor-wrapper {
    display: flex;
    flex-direction: column;
}

iframe {
    width: 100%;
    height: 300px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
}
```

---

## 🎉 Result

Now users can:

* Edit a full HTML page (`<html>`, `<body>` etc.)
* Or switch to a **modular HTML + CSS + JS** combo
* See instant preview in both modes

---

## 🔮 Want to Add More?

Let me know if you want to:

* Add **Markdown** with live rendering
* Save/load code from **localStorage**
* Allow theme switching (light/dark preview)
* Export code as a `.zip` or `.html`

We can go as far as you’d like!
