'use strict';

// navbar variables
const nav = document.querySelector('.mobile-nav');
const navMenuBtn = document.querySelector('.nav-menu-btn');
const navCloseBtn = document.querySelector('.nav-close-btn');

// navToggle function
const navToggleFunc = function () {
  nav.classList.toggle('active');
};

navMenuBtn.addEventListener('click', navToggleFunc);
navCloseBtn.addEventListener('click', navToggleFunc);

// theme toggle variables
const themeBtn = document.querySelectorAll('.theme-btn');

// Set default theme to dark
document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('dark-theme');
  document.body.classList.remove('light-theme');

  for (let i = 0; i < themeBtn.length; i++) {
    themeBtn[i].classList.add('dark');
    themeBtn[i].classList.remove('light');
  }
});

// Theme toggle
for (let i = 0; i < themeBtn.length; i++) {
  themeBtn[i].addEventListener('click', function () {
    // toggle `light-theme` & `dark-theme` class from `body`
    // when clicked `theme-btn`
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    for (let i = 0; i < themeBtn.length; i++) {
      // When the `theme-btn` is clicked,
      // it toggles classes between `light` & `dark` for all `theme-btn`.
      themeBtn[i].classList.toggle('light');
      themeBtn[i].classList.toggle('dark');
    }
  });
}

// Fetch and display blog posts
fetch('./assets/data/blog-posts.json')
    .then(response => response.json())
    .then(posts => {
      const blogCardGroup = document.getElementById('blog-card-group');
      blogCardGroup.innerHTML = '';
      posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'blog-card';
        card.innerHTML = `
        <div class="blog-card-banner">
          <img src="${post.bannerImg}" alt="${post.title}" width="250" class="blog-banner-img">
        </div>
        <div class="blog-content-wrapper">
      
          <h3>
            <a href="#" class="h3">${post.title}</a>
          </h3>
          <p class="blog-text">${post.text}</p>
          <div class="wrapper-flex">
            <div class="profile-wrapper">
              <img src="${post.authorImg}" alt="${post.authorName}" width="50">
            </div>
            <div class="wrapper">
              <a href="#" class="h4">${post.authorName}</a>
              <p class="text-sm">
                <time datetime="${post.date}">${new Date(post.date).toLocaleDateString()}</time>
                <span class="separator"></span>
                <ion-icon name="time-outline"></ion-icon>
                <time datetime="${post.readTime}">${Math.ceil(parseInt(post.readTime.slice(2)) / 60)} min</time>
              </p>
            </div>
          </div>
        </div>
      `;
        blogCardGroup.appendChild(card);
      });
    });

// Text content generation in inhalt.html
document.addEventListener('DOMContentLoaded', function() {
    fetch('./assets/data/data.json')
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById('content');
            data.text.forEach(item => {
                const section = document.createElement('section');
                section.innerHTML = `
                    <h1>${item.title}</h1>
                    <p>${item.content}</p>
                `;
                contentDiv.appendChild(section);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));

    const themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
    });
});