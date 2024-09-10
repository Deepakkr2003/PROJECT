document.addEventListener('DOMContentLoaded', function () {
    const enrollBtn = document.querySelector('.enroll-btn');
    const enrollmentContainer = document.querySelector('.enrollment-container');

    enrollBtn.addEventListener('mouseenter', function () {
        enrollmentContainer.style.display = 'block';
    });

    enrollBtn.addEventListener('mouseleave', function () {
        enrollmentContainer.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const enrollBtn = document.querySelector('.enroll-btn');
    const enrollmentContainer = document.querySelector('.enrollment-container');
    const loginForm = document.getElementById('loginForm');
    const logo = document.getElementById('logo');
    const img2 = document.getElementById('img2');
    const img4 = document.querySelector('.img4');
    const mainContent = document.querySelector('.first');

    
    img4.style.display = 'none';

   
    enrollBtn.addEventListener('mouseenter', function () {
        enrollmentContainer.style.display = 'block';
    });

    enrollBtn.addEventListener('mouseleave', function () {
        enrollmentContainer.style.display = 'none';
    });

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        
        mainContent.classList.add('hide-content');
        img2.classList.add('hide-content');

        document.body.style.backgroundColor = 'white';

        logo.classList.add('animate');

        setTimeout(() => {
            logo.style.opacity = '0';
        }, 2000);

        setTimeout(() => {
            img4.classList.add('fullscreen-img4');
            img4.style.display = 'block'; 
        }, 3000);

        setTimeout(() => {
            logo.classList.add('white-circle');
            logo.style.opacity = '1';
        }, 5000);

        setTimeout(() => {
            window.location.reload();
        }, 7000);
    });
});

