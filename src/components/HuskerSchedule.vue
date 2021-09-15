<template>
  <div>
    <h2 class="liberator">Husker Schedule</h2>
    <div v-for="game in schedule" v-bind:key="game.id">
      <div class="game-line">
        <div>
          {{ game.home_team === "Nebraska" ? "vs" : "@" }}
          {{ game.home_team === "Nebraska" ? game.away_team : game.home_team }}
        </div>
        <div v-if="dateInPast(game.start_date)">
          {{
            nebraskaWon(game.home_team, game.home_points, game.away_points)
              ? "W"
              : "L"
          }}
          {{
            game.away_team === "Nebraska"
              ? `${game.away_points} - ${game.home_points}`
              : `${game.home_points} - ${game.away_points}`
          }}
        </div>
        <div v-else>
          {{ getGameTime(game.start_date, game.start_time_tbd) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-line {
  display: flex;
  justify-content: space-between;
}
</style>

<script>
import { getSchedule, localSchedule } from "./schedule";
export default {
  setup() {
    let schedule = localSchedule;
    return {
      schedule,
    };
  },
  methods: {
    getNewSchedule: async () =>
      await getSchedule().then((response) => response),
    dateInPast: (date) => new Date(date) <= new Date(Date.now()).setHours(+5),
    nebraskaWon: (home_team, home_points, away_points) =>
      home_team === "Nebraska"
        ? away_points < home_points
        : home_points < away_points,
    getGameTime: (start_date, tbd) => {
      const asDate = new Date(start_date);
      let output = asDate
        .toLocaleDateString("en-US", { timeZone: "GMT" })
        .slice(0, -5);
      if (!tbd)
        output = output.concat(" ").concat(
          asDate
            .toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
            .slice(0, -3)
        );
      return output;
    },
  },
  async beforeMount() {
    this.schedule = await this.getNewSchedule();
    this.$forceUpdate();
  },
};
</script>
