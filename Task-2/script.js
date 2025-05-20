// Contact Form Validation
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const formMessage = document.getElementById('formMessage');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    formMessage.textContent = 'Please fill out all fields.';
    formMessage.style.color = 'red';
  } else if (!emailRegex.test(email)) {
    formMessage.textContent = 'Invalid email address.';
    formMessage.style.color = 'red';
  } else {
    formMessage.textContent = 'Message sent successfully!';
    formMessage.style.color = 'green';
    this.reset();
    setTimeout(() => {
      formMessage.textContent = '';
    }, 3000);
  }
});

// To-Do List Function
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  const taskText = taskInput.value.trim();
  if (!taskText) {
    alert("Please enter a task!");
    taskInput.focus();
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `${taskText} <button onclick="this.parentElement.remove()">Delete</button>`;
  taskList.appendChild(li);
  taskInput.value = "";
  taskInput.focus();
}
