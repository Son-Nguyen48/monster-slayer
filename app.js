function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null
    };
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHealth < 0)
        return { width: "0%", transition: "all 0.3s ease-in" };
      return {
        width: this.monsterHealth + "%",
        transition: "all 0.3s ease-in"
      };
    },
    playerBarStyle() {
      if (this.playerHealth < 0)
        return { width: "0%", transition: "all 0.3s ease-in" };
      return { width: this.playerHealth + "%", transition: "all 0.3s ease-in" };
    },
    mayUseSpecialAttack() {
      if (!this.currentRound) {
        return true;
      } else {
        return this.currentRound % 3 !== 0;
      }
    }
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        //A draw
        this.winner = "draw";
      } else if (value <= 0) {
        //Monster won
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        //A draw
        this.winner = "draw";
      } else if (value <= 0) {
        //You won
        this.winner = "player";
      }
    }
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth = this.monsterHealth - attackValue;
      console.log("Monster: ", this.monsterHealth);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 12);
      this.playerHealth = this.playerHealth - attackValue;
      console.log("Player: ", this.playerHealth);
      console.log("+1");
    },
    specialAttack() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth = this.monsterHealth - attackValue;
      this.attackPlayer();
      console.log("Monster: ", this.monsterHealth);
    },
    healHealthBar() {
      this.currentRound++;
      if (this.playerHealth > 80) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += 20;
      }
      this.attackPlayer();
    },
    resetTheGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.currentRound = 0;
      this.winner = null;
    },
    surrender() {
      this.playerHealth = 0;
      this.winner = "monster";
    }
  }
});

app.mount("#game");
