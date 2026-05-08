const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });




      //   // Smooth scroll to features
      //   function scrollToFeatures() {
      //     const featuresSection = document.getElementById('features');
      //     featuresSection.scrollIntoView({
      //         behavior: 'smooth'
      //     });
      // }

      // // Scroll animation trigger
      // window.addEventListener('scroll', () => {
      //     const featureItems = document.querySelectorAll('.feature-item');
      //     const triggerBottom = window.innerHeight / 5 * 4;

      //     featureItems.forEach(item => {
      //         const itemTop = item.getBoundingClientRect().top;
              
      //         if(itemTop < triggerBottom) {
      //             item.classList.add('active');
      //         } else {
      //             item.classList.remove('active');
      //         }
      //     });
      // });

      // // Initialize scroll check on load
      // window.dispatchEvent(new Event('scroll'));




      // Modified JavaScript
// smooth scroll to features
function scrollToFeatures() {
  const featuresSection = document.getElementById('features');
  featuresSection.scrollIntoView({
      behavior: 'smooth'
  });
}


// scroll animation trigger
window.addEventListener('scroll', () => {
  const animatedElements = document.querySelectorAll(
      '.feature-heading, .feature-item, .jsonToForm-img, .jsonToSchema-img'
  );
  const triggerBottom = window.innerHeight / 5 * 4;

  animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if(elementTop < triggerBottom) {
          element.classList.add('active');
      } else {
          element.classList.remove('active');
      }
  });
});

// Initialize scroll check on load
window.dispatchEvent(new Event('scroll'));