const swiper = new Swiper('.swiper', {
  loop: true,
  slidesPerView: 'auto',
});


window.addEventListener('scroll', function () {
  const scroll = window.scrollY; // スクロール量を取得
  const windowHeight = window.innerHeight; // 画面の高さを取得
  const boxes = document.querySelectorAll('.is-fadeIn'); // すべての.is-fadeInを取得
  const fadeInPosition = -200; // フェードインの位置を設定
  boxes.forEach(function (box) {
    const distanceToBox = box.offsetTop;
    if (scroll + windowHeight + fadeInPosition > distanceToBox) {
      box.classList.add('is-active');
    }
  });
});

window.addEventListener('load', function () {
  const scroll = window.scrollY; // スクロール量を取得
  const windowHeight = window.innerHeight; // 画面の高さを取得
  const boxes = document.querySelectorAll('.is-fadeIn'); // すべての.is-fadeInを取得
  const fadeInPosition = -200; // フェードインの位置を設定
  boxes.forEach(function (box) {
    const distanceToBox = box.offsetTop;
    if (scroll + windowHeight + fadeInPosition > distanceToBox) {
      box.classList.add('is-active');
    }
  });
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: "smooth"
      });
    }
  });
});