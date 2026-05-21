  // Nav scroll
  window.addEventListener('scroll', function() {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 40);
  });

  // Mobile menu
  function closeMenu() {
    document.getElementById('burger').classList.remove('open');
    document.getElementById('mob-menu').classList.remove('open');
  }
  document.getElementById('burger').addEventListener('click', function() {
    this.classList.toggle('open');
    document.getElementById('mob-menu').classList.toggle('open');
  });

  // Scroll reveal
  var revEls = document.querySelectorAll('.reveal');
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('in'); }
    });
  }, { threshold: 0.1 });
  revEls.forEach(function(el) { obs.observe(el); });

  // Form submit
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = document.getElementById('form-submit');
      if (!btn) return;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      var data = new FormData(contactForm);
      fetch(contactForm.action, {
        method: contactForm.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      }).then(function(response) {
        if (response.ok) {
          btn.textContent = '✓ Message sent! We will be in touch soon.';
          btn.style.background = 'var(--g1)';
          contactForm.reset();
        } else {
          response.json().then(function(data) {
            if (Object.hasOwn(data, 'errors')) {
              btn.textContent = data.errors.map(function(err) { return err.message }).join(', ');
            } else {
              btn.textContent = 'Oops! There was a problem submitting your form';
            }
            btn.disabled = false;
          });
        }
      }).catch(function(error) {
        btn.textContent = 'Oops! There was a problem submitting your form';
        btn.disabled = false;
      });
    });
  }

  // Notify submit
  var notifyForm = document.getElementById('notify-form');
  if (notifyForm) {
    notifyForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = document.getElementById('notify-btn');
      if (!btn) return;
      btn.textContent = 'Subscribing…';
      btn.disabled = true;

      var data = new FormData(notifyForm);
      fetch(notifyForm.action, {
        method: notifyForm.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      }).then(function(response) {
        if (response.ok) {
          btn.textContent = '✓ Subscribed!';
          btn.style.background = 'var(--g1)';
          notifyForm.reset();
        } else {
          response.json().then(function(data) {
            if (Object.hasOwn(data, 'errors')) {
              btn.textContent = data.errors.map(function(err) { return err.message }).join(', ');
            } else {
              btn.textContent = 'Oops! There was a problem subscribing';
            }
            btn.disabled = false;
          });
        }
      }).catch(function(error) {
        btn.textContent = 'Oops! There was a problem subscribing';
        btn.disabled = false;
      });
    });
  }
