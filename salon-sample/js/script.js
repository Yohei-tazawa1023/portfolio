// ヘッダーの背景切り替え
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.style.background = "#f8f8f8";
  } else {
    header.style.background = "#fff";
  }
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

// スクロールアニメーション
const fadeinElements = document.querySelectorAll(".fadein");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

fadeinElements.forEach(el => observer.observe(el));

// フォーム送信（デモ用アラート）
document.querySelector(".reserve-form").addEventListener("submit", e => {
  e.preventDefault();
  alert("ご予約ありがとうございます！\n送信内容を確認のうえ、ご連絡いたします。");
});
