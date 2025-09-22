<template>
  <div class="about-page">
    <h1>Mementoとは</h1>
    <div class="about-section">
      <p>
        Mementoは、人生を週単位で可視化するライフカレンダーです。人生には限りがあり、与えられた時間をどのように過ごすかはとても大切なテーマです。Mementoは、残された時間を視覚的に示すことで、日々の選択や行動に意識を向けるきっかけを与えてくれます。
      </p>
    </div>

    <div class="about-section">
      <p>
        名前は、ラテン語の「Memento
        mori（死を想え）」に由来しています。人は、終わりがあることを意識することで、今この瞬間を大切にしようとするものです。Mementoは、そうした意識を日常に取り入れ、自分にとって価値のある時間の使い方を見つめ直すためのサポートツールです。
      </p>
    </div>

    <section class="about-section">
      <h2>インスピレーション</h2>
      <p>
        このプロジェクトは、Tim Urban氏の「Your Life in
        Weeks」という記事からインスピレーションを得ています。
        一年を52週として、80年分の人生を格子状に表現することで、
        私たちの人生の有限性と可能性を直感的に理解することができます。
      </p>
    </section>

    <section class="about-section">
      <h2>使い方</h2>
      <p>
        1. 誕生日を入力する<br />
        2. 表示される人生カレンダーで、これまでの週と残りの週を確認する<br />
        3. 重要な出来事や目標を記録する<br />
        4. 定期的にカレンダーを見直し、人生の計画や振り返りに活用する
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'About',
}
</script>

<style scoped>
.about-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 300;
}

.about-section {
  margin-bottom: 3rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 400;
  color: #333;
}

p {
  line-height: 1.8;
  color: #444;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}
</style>
