<template>
  <div>
    <h2 class="liberator">Husker Schedule</h2>
    <div v-for="game in schedule" v-bind:key="game.date">
      <div class="game-line">
        <div>
          {{ game.away ? "@" : "vs" }}
          {{ game.opponentName }}
        </div>
        <div>
          {{ !!game.huskerScore ? `${game.huskerScore > game.opponentScore ? 'W' : 'L'} ${game.huskerScore} - ${game.opponentScore}` : game.date }}
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
import { ref } from "vue";
import { huskerSchedule } from "./schedule";
export default {
  setup() {
    const schedule = huskerSchedule;

    return {
      schedule,
    };
  },
};
</script>
