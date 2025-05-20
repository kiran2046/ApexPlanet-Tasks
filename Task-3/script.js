// Quiz Questions
const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "jQuery", "CSS"],
    answer: "CSS"
  },
  {
    question: "What does API stand for?",
    options: ["Application Programming Interface", "Advanced Programming Index", "Application Page Interface"],
    answer: "Application Programming Interface"
  }
];

let currentQ = 0;
let score = 0;

function loadQuestion() {
  const q = quizData[currentQ];
  document.getElementById("question").innerText = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => handleAnswer(opt);
    optionsDiv.appendChild(btn);
  });
  document.getElementById("score").innerText = `Score: ${score} / ${quizData.length}`;
}

function handleAnswer(selected) {
  const q = quizData[currentQ];
  const optionsDiv = document.getElementById("options");
  Array.from(optionsDiv.children).forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === q.answer) {
      btn.style.background = "#4caf50";
    } else if (btn.innerText === selected) {
      btn.style.background = "#f44336";
    }
  });
  if (selected === q.answer) score++;
  document.getElementById("score").innerText = `Score: ${score} / ${quizData.length}`;
  setTimeout(nextQuestion, 900);
}

function nextQuestion() {
  currentQ++;
  if (currentQ < quizData.length) {
    loadQuestion();
  } else {
    document.getElementById("quiz-container").innerHTML = `
      <p>Your score: ${score} / ${quizData.length}</p>
      <button id="restart-btn">Restart Quiz</button>
    `;
    document.getElementById("restart-btn").onclick = () => {
      currentQ = 0;
      score = 0;
      document.getElementById("quiz-container").innerHTML = `
        <div id="question"></div>
        <div id="options"></div>
        <div id="score"></div>
      `;
      loadQuestion();
    };
  }
}

// Joke API
function getJoke() {
  const jokeElem = document.getElementById("joke");
  jokeElem.innerText = "Loading...";
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => {
      jokeElem.innerText = `${data.setup} 🤔 ${data.punchline}`;
    })
    .catch(() => {
      jokeElem.innerText = "Failed to fetch joke 😞";
    });
}

// Carousel Data
const carouselImages = [
  {
    src: "https://source.unsplash.com/400x200/?nature,sunrise",
    caption: "Beautiful Sunrise"
  },
  {
    src: "https://source.unsplash.com/400x200/?nature,lake",
    caption: "Serene Lake View"
  },
  {
    src: "https://source.unsplash.com/400x200/?nature,mountains",
    caption: "Majestic Mountains"
  }
];
let carouselIndex = 0;

function showCarouselImage(idx) {
  const img = document.getElementById("carousel-img");
  const caption = document.getElementById("carousel-caption");
  
  // Add loading state
  img.style.opacity = "0.5";
  caption.innerText = "Loading...";
  
  // Create new image to preload
  const newImg = new Image();
  newImg.onload = function() {
    img.src = this.src;
    img.style.opacity = "1";
    caption.innerText = carouselImages[idx].caption;
  };
  newImg.onerror = function() {
    img.src = "https://via.placeholder.com/400x200?text=Image+Not+Found";
    img.style.opacity = "1";
    caption.innerText = "Image failed to load";
  };
  newImg.src = carouselImages[idx].src;
}

function nextCarousel() {
  carouselIndex = (carouselIndex + 1) % carouselImages.length;
  showCarouselImage(carouselIndex);
}

function prevCarousel() {
  carouselIndex = (carouselIndex - 1 + carouselImages.length) % carouselImages.length;
  showCarouselImage(carouselIndex);
}

function initCarousel() {
  const carouselImg = document.getElementById("carousel-img");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  
  if (carouselImg && nextBtn && prevBtn) {
    showCarouselImage(carouselIndex);
    nextBtn.onclick = nextCarousel;
    prevBtn.onclick = prevCarousel;
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight') nextCarousel();
      if (e.key === 'ArrowLeft') prevCarousel();
    });
  }
}

// Load first quiz question and initialize carousel
window.onload = function() {
  loadQuestion();
  initCarousel();
};
