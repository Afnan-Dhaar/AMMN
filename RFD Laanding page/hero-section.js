let currentSlide=0;
const slides=document.querySelectorAll('.carousel-slide');
const dots=document.querySelectorAll('.dot');

function showSlide(i){
    slides.forEach((s,idx)=>{
        s.classList.remove('active');
        dots[idx].classList.remove('active');
    });
    currentSlide=(i+slides.length)%slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}
function nextSlide(){showSlide(currentSlide+1);}
function prevSlide(){showSlide(currentSlide-1);}
function goToSlide(i){showSlide(i);}