// script.js

const jobForm = document.getElementById('jobForm');
const companyInput = document.getElementById('companyInput');
const roleInput = document.getElementById('roleInput');
const dateInput = document.getElementById('dateInput');
const jobList = document.getElementById('jobList');

let jobs = []; // You can replace this with data from an API later

function renderJobs() {
    jobList.innerHTML = '';

    jobs.forEach((job, index) => {
        const jobItem = document.createElement('div');
        jobItem.classList.add('job-item');

        const info = document.createElement('div');
        info.classList.add('info');
        info.innerHTML = `
      <p><strong>${job.company}</strong></p>
      <p>${job.role}</p>
    `;

        const date = document.createElement('div');
        date.classList.add('date');
        date.textContent = job.date;

        jobItem.appendChild(info);
        jobItem.appendChild(date);

        jobList.appendChild(jobItem);
    });
}

jobForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newJob = {
        company: companyInput.value.trim(),
        role: roleInput.value.trim(),
        date: dateInput.value
    };

    if (!newJob.company || !newJob.role || !newJob.date) return;

    jobs.push(newJob);
    renderJobs();
    jobForm.reset();
});

// Initial render
renderJobs();
