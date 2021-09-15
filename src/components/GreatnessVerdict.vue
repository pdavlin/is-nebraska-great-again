<template>
  <div class="card">
    <div>
      <div class="verdict liberator emphasize">
        {{ this.wins >= 9 ? "oh yeah baby the skers are back!!!!!!!!!" : "Not Yet." }}
      </div>
      <h2 class="liberator">
        <span class="emphasize">{{this.wins ?? 2}}</span> wins in 2021
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
import { getSchedule, localSchedule, localWins } from "./schedule";
export default {
  setup() {
    let schedule = localSchedule;
    let wins = localWins;
    return {
      schedule,
      wins,
    };
  },
  methods: {
    getNewSchedule: async () =>
      await getSchedule().then((response) => response),
    computeGreatness: (schedule) =>
      schedule
        .map(game => {
          return game.away_team === 'Nebraska' ? {
            huskerScore: game.away_points, opponentScore: game.home_points
          } : {
            huskerScore: game.home_points, opponentScore: game.away_points
          }
        })
        .map((game) => {
          return game.huskerScore && game.huskerScore > game.opponentScore
            ? 1
            : 0;
        })
        .reduce((val, acc) => acc + val),
  },
  async beforeMount() {
    this.schedule = await this.getNewSchedule();
    this.wins = this.computeGreatness(this.schedule);
    this.$forceUpdate();
  },
};
</script>