<template>
  <div class="card">
    <div>
      <div class="verdict liberator emphasize">
        {{ this.wins >= 9 ? "Yes" : "Not Yet." }}
      </div>
      <h2 class="liberator">
        <span class="emphasize">{{ this.wins }}</span> wins in 2021
      </h2>
    </div>
    <p>
      To be great again, Nebraska needs to win back-to-back national
      championships.
    </p>
    <p>
      Failing that, Nebraska first needs to achieve the greatness of the Bo
      Pelini era: at least 9 wins, and 3 losses.
    </p>
  </div>
</template>

<style scoped>

.verdict-container > p {
  padding: 0.25rem 0rem;
}

.verdict {
  font-size: 8rem;
}
</style>

<script>
import { huskerSchedule } from "./schedule";
export default {
  setup() {
    const schedule = huskerSchedule;
    let wins;
    return {
      schedule,
      wins,
    };
  },
  methods: {
    computeGreatness: () =>
      huskerSchedule
        .map((game) => {
          return game.huskerScore && game.huskerScore > game.opponentScore
            ? 1
            : 0;
        })
        .reduce((val, acc) => acc + val),
  },
  beforeMount() {
    this.wins = this.computeGreatness();
  },
};
</script>