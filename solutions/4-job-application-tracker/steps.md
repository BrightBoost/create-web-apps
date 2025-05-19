Awesome! Let's break down the **"Mark a Job as Favorite"** feature into clean, manageable steps so you understand and own the process — while keeping the code readable and easy to extend. ⭐

---

## ✅ Feature Goal: Mark a Job as Favorite

We'll allow users to:

* Toggle favorite status (⭐/☆)
* See visual feedback (highlighted job, bold star)
* Persist it to the backend (in `jobs.json`)

---

## 🪜 Step-by-Step Implementation

---

### **Step 1: Update the Data Model**

In `server.js`, when creating a job (inside `POST /api/jobs`), set a default `favorite` field:

```js
const newJob = {
  id: Date.now(),
  ...req.body,
  status: req.body.status || 'applied',
  favorite: false // <-- this is new
};
```

---

### **Step 2: Add a PATCH route to toggle favorite**

Still in `server.js`, add or extend this:

```js
app.patch('/api/jobs/:id', (req, res) => {
  const jobs = readJobs();
  const job = jobs.find(job => job.id === Number(req.params.id));
  if (job) {
    Object.assign(job, req.body); // Accepts favorite: true/false
    writeJobs(jobs);
    res.json(job);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
});
```

---

### **Step 3: Add Favorite Button in `renderJob()` (frontend)**

In your `script.js`, inside the `renderJob(job)` function:

```js
// Favorite toggle
const favBtn = document.createElement('button');
favBtn.innerHTML = job.favorite ? '⭐' : '☆';
favBtn.title = 'Toggle favorite';
favBtn.className = 'fav-btn';

favBtn.addEventListener('click', async () => {
  const res = await fetch(`${API_URL}/${job.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ favorite: !job.favorite }),
  });
  const updated = await res.json();
  item.remove();         // Remove current card
  renderJob(updated);    // Re-render updated card
});
```

Also, **highlight the job visually** if it's a favorite:

```js
if (job.favorite) item.classList.add('favorite');
```

---

### **Step 4: Style Favorites with CSS**

In `style.css`, add:

```css
.fav-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  color: #f0c419;
}

.fav-btn:hover {
  transform: scale(1.2);
}

.favorite {
  border-left: 4px solid #f0c419;
  box-shadow: 0 4px 12px rgba(255, 208, 0, 0.2);
}
```

---

### **Step 5: Test It**

1. Add a job → click ☆ to turn it into ⭐
2. Refresh the page → favorite status is saved
3. Click again → toggle back to ☆

---

## 🎉 You Now Have:

* A clickable favorite toggle ⭐
* Highlighted layout for favorites
* Persistence across reloads

---

Would you like to add:

* 🔍 Filtering: "Show only favorites"
* ❤️ Heart instead of star?
* 🔄 Auto-sort favorites on top?

Happy to walk through those step by step too!
