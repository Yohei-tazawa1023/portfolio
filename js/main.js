const swiper = new Swiper('.swiper', {
  loop: true,
  slidesPerView: 'auto',
});

window.addEventListener('scroll', function () {
  const scroll = window.scrollY; // スクロール量を取得
  const windowHeight = window.innerHeight; // 画面の高さを取得
  const pattern1 = document.querySelectorAll('.is-fadeIn'); // すべての.is-fadeInを取得
  const pattern2 = document.querySelectorAll('.is-fadeIn2'); // すべての.is-fadeIn2を取得
  const fadeInPosition = -200; // フェードインの位置を設定
  // pattern1.forEach(function (box) {
  //   const distanceToBox = box.offsetTop;
  //   if (scroll + windowHeight + fadeInPosition > distanceToBox) {
  //     box.classList.add('is-active');
  //   }
  // });
  // pattern2.forEach(function (box) {
  //   const distanceToBox = box.offsetTop;
  //   if (scroll + windowHeight + fadeInPosition > distanceToBox) {
  //     box.classList.add('is-active2');
  //   }
  // });
  const fadeINPosition = document.querySelectorAll('.is-fadeIn_position');
  fadeINPosition.forEach(function (box) {
    const distanceToBox = box.offsetTop;
    if (scroll + windowHeight + fadeInPosition > distanceToBox) {
      const textAll = document.querySelectorAll('.is-fadeIn3');
      console.log("動いてるよ");
      gsap.from(textAll, {
      autoAlpha: 0,
      y: 50,
      duration: 0.4,
      stagger: {
        each: 0.6, //各アニメーションの間隔を指定します。
        // from: "random", //最初のアニメーションの間隔をランダムにします。
      },
    });
    }
  });
});

