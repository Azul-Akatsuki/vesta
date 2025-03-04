document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const memberList = document.querySelectorAll(".bk-black");
    const memberLink = document.querySelectorAll(".m-memberList a");
    const sectionHeight = 700;
    let isScrolling = false;

    function scrollToAnchor() {
      if (window.location.hash) {
        const targetId = window.location.hash.replace("#", ""); // ハッシュからID取得
        const targetSection = document.getElementById(targetId);
  
        if (targetSection) {
          isScrolling = true; // スクロール中フラグをセット
  
          // すべての `active` クラスを削除
          sections.forEach(section => section.classList.remove("active"));
          memberList.forEach(menu => menu.classList.remove("active"));
  
          // 対象のセクションをアクティブ化
          targetSection.classList.add("active");
  
          // 対応するメニューもアクティブ化
          const targetMenu = document.querySelector(`.m-memberList a[href="#${targetId}"]`);
          if (targetMenu) {
            targetMenu.previousElementSibling.classList.add("active");
          }
  
          // スクロール実行
          window.scrollTo({
            top: Array.from(sections).indexOf(targetSection) * sectionHeight,
            behavior: "auto" // ページロード時は瞬時に移動
          });
  
          setTimeout(() => {
            isScrolling = false; // スクロール完了後に解除
          }, 500);
        }
      }
    }
  
    window.addEventListener("scroll", () => {
      if (isScrolling) return; // クリック後のスクロール中は処理を無視
  
      const scrollY = window.scrollY;
      const halfSectionHeight = sectionHeight / 2; // 画面中央判定用
  
      sections.forEach((section, index) => {
        const sectionTop = index * sectionHeight;
        const sectionBottom = (index + 1) * sectionHeight;
  
        // 画面中央に来たら `active` を適用
        if (scrollY + halfSectionHeight >= sectionTop && scrollY + halfSectionHeight < sectionBottom) {
          sections.forEach(s => s.classList.remove("active"));
          memberList.forEach(m => m.classList.remove("active"));
          section.classList.add("active");
          memberList[index].classList.add("active");
        }
      });
    });
  
    // メニュークリック時のスクロール処理
    memberLink.forEach((link, index) => {
      link.addEventListener("click", (event) => {
        event.preventDefault(); // デフォルトのリンク動作を防ぐ
        isScrolling = true; // スクロール中は他の処理を無効化
  
        // すべての `active` クラスを削除
        sections.forEach(section => section.classList.remove("active"));
        memberList.forEach(menu => menu.classList.remove("active"));
  
        // クリックしたメニューに対応するセクションをアクティブ化
        sections[index].classList.add("active");
        memberList[index].classList.add("active");
  
        // 指定のスクロール位置に移動
        window.scrollTo({
          top: index * sectionHeight,
          behavior: "smooth"
        });
  
        // スクロール完了後に `isScrolling` を解除
        setTimeout(() => {
          isScrolling = false;
        }, 800); // `smooth` のアニメーション時間と同期
      });
    });

    scrollToAnchor();

  });
