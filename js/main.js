document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav ul');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.style.display === 'flex';
      nav.style.display = isOpen ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '72px';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.background = '#14132B';
      nav.style.padding = '18px 24px 26px';
      nav.style.gap = '18px';
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name').value.trim();
      var email = form.querySelector('#email').value.trim();
      var message = form.querySelector('#message').value.trim();
      var subject = encodeURIComponent('Prise de contact — site Avens Conseil');
      var body = encodeURIComponent(
        'Nom : ' + name + '\nEmail : ' + email + '\n\n' + message
      );
      window.location.href = 'mailto:contact@avensconseil.com?subject=' + subject + '&body=' + body;
    });
  }
});
