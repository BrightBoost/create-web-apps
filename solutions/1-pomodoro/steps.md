

## ✅ Definition: What Does "Tracking Cycles" Mean?

In the **Pomodoro technique**, a **cycle** usually consists of:

* **1 Focus period (25 minutes)**
* Followed by **1 short break (5 minutes)**

So, a **completed Pomodoro cycle** = **work + break**.

We can **track cycles** in multiple ways:

| Concept                     | Example                                    |
| --------------------------- | ------------------------------------------ |
| 🔁 **Cycle Counter**        | "You've completed 3 Pomodoro cycles today" |
| 📊 **Work Session Counter** | Count only the focus sessions              |
| ⏱️ **Daily Summary**        | "3 cycles, 75 minutes of work"             |
| 🗂️ **Cycle Log**           | A timestamped history                      |

For now, let’s implement a **simple and clear Pomodoro cycle counter**, like:

> **Cycles completed: 2**

Every time the timer switches from a **break back to a new work session**, we increment the cycle count by 1.

---

## 🛠️ Let's Add It

### ✅ Step 1: Add HTML to show cycle count

In your `<main class="container">`, below the status line:

```html
<div class="cycles" id="cycleCount">Cycles completed: 0</div>
```

### ✅ Step 2: Update your JavaScript

Add this at the top:

```js
const cycleCountDisplay = document.getElementById('cycleCount');
let cycleCount = 0;
```

Update `toggleStatus()` like this:

```js
function toggleStatus() {
    isWorkTime = !isWorkTime;
    if (isWorkTime) {
        // Completed a break, now entering new focus = 1 full cycle
        cycleCount++;
        updateCycleDisplay();
    }
    timeLeft = isWorkTime ? workDuration : breakDuration;
    statusDisplay.textContent = isWorkTime ? 'Focus Time' : 'Break Time';
}
```

Add this function to update the UI:

```js
function updateCycleDisplay() {
    cycleCountDisplay.textContent = `Cycles completed: ${cycleCount}`;
}
```

Also, in `resetTimer()`, optionally reset cycles too:

```js
function resetTimer() {
    pauseTimer();
    timeLeft = isWorkTime ? workDuration : breakDuration;
    updateTimerDisplay();
    // Uncomment if reset should also reset cycles:
    // cycleCount = 0;
    // updateCycleDisplay();
}
```

Finally, call it once on page load:

```js
updateTimerDisplay();
updateCycleDisplay();
```

---

## 🎉 Result

Every time you complete a full Pomodoro (work + break), your app will now say:

> **Cycles completed: 1**

Then 2, 3, etc. — all in real-time.

---

## 🧩 Optional Future Enhancements

Let me know if you’d like to expand with:

* ⏱ Long breaks after X cycles
* 📆 Daily reset and localStorage tracking
* 📊 Visual progress tracker (circles or bars)
* 🕐 Total time spent focusing

Want me to build any of those next?
