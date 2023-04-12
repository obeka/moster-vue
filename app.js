function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
    };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value < 0 && this.monsterHealth < 0) {
        this.winner = "draw";
      } else if (value < 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value < 0 && this.playerHealth < 0) {
        this.winner = "draw";
      } else if (value < 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackedValue = getRandomValue(5, 12);
      this.monsterHealth -= attackedValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackedValue = getRandomValue(8, 15);
      this.playerHealth -= attackedValue;
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackedValue = getRandomValue(10, 25);
      this.monsterHealth -= attackedValue;
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
        return;
      }
      this.playerHealth += healValue;
      this.attackPlayer();
    },
  },
});

app.mount("#game");
