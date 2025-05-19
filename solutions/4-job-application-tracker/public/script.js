const jobForm = document.getElementById('jobForm');
const jobList = document.getElementById('jobList');
const API_URL = 'http://localhost:3000/api/jobs';

function renderJob(job) {
    const item = document.createElement('div');
    item.className = 'job-item';
    if (job.favorite) item.classList.add('favorite');

    const info = document.createElement('div');
    info.className = 'info';
    info.innerHTML = `
        <p><strong>${job.company}</strong> – ${job.role}</p>
        <p class="date">Applied: ${job.date || 'N/A'}</p>
    `;

    const controls = document.createElement('div');
    controls.className = 'controls';

    // Status input
    const statusInput = document.createElement('input');
    statusInput.type = 'text';
    statusInput.value = job.status || '';
    statusInput.className = 'status-input';
    statusInput.addEventListener('blur', async () => {
        await fetch(`${API_URL}/${job.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: statusInput.value }),
        });
    });

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
        item.remove();
        renderJob(updated); // re-render
    });

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑';
    delBtn.className = 'del-btn';
    delBtn.title = 'Delete job';
    delBtn.addEventListener('click', async () => {
        await fetch(`${API_URL}/${job.id}`, { method: 'DELETE' });
        item.remove();
    });

    controls.appendChild(statusInput);
    controls.appendChild(favBtn);
    controls.appendChild(delBtn);

    item.appendChild(info);
    item.appendChild(controls);
    jobList.appendChild(item);
}


async function fetchJobs() {
    jobList.innerHTML = '';
    const res = await fetch(API_URL);
    const jobs = await res.json();
    jobs.forEach(renderJob);
}

jobForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const company = document.getElementById('companyInput').value;
    const role = document.getElementById('roleInput').value;
    const date = document.getElementById('dateInput').value;

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, role, date }),
    });

    const newJob = await res.json();
    renderJob(newJob);
    jobForm.reset();
});

fetchJobs();
