<template>
  <div class="deviceValueCard">
    <div class="header">
      <span class="updateTime">{{ updateTimeString }}</span>
    </div>
    <div class="content">
      <template v-if="isSwitch">
        <span class="deviceValue">{{ switchText }}</span>
        <div class="switchIcon">
          <v-avatar size="24" :color="switchIconColor">
            <v-icon color="white">mdi-power</v-icon>
          </v-avatar>
        </div>
      </template>
      <template v-else>
        <span class="deviceValue">{{ deviceValue }}</span>
        <span class="measureSymbol">{{ measureSymbol }}</span>
      </template>
    </div>
    <div class="footer">
      <span class="functionName">{{ functionName }}</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    deviceValue: Number,
    measureSymbol: String,
    functionName: String,
    updateTime: Date,
    isSwitch: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    switchText() {
      return this.deviceValue ? "вкл" : "выкл";
    },
    switchIconColor() {
      return this.deviceValue ? "green darken-2" : "red darken-2";
    },
    updateTimeString() {
      return moment(this.updateTime).format("DD.MM.YYYY hh:mm");
    },
  },
};
</script>

<style scoped>
.deviceValueCard {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  margin: 5px 10px 5px 5px;
  width: 100px;
  box-sizing: content-box;
  border-radius: 10px;
  background: #fdfeff;
  padding: 10px 10px 10px 10px;
  box-shadow: 0 8px 20px 6px rgba(0, 0, 0, 0.125);
}
.content {
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.footer {
  display: flex;
  align-items: center;
  height: 100%;
}
.measureSymbol {
  margin-left: 2px;
}
.functionName {
  color: #666b7d;
  font-size: 12px;
  word-wrap: normal;
  max-width: 100px;
  text-align: center;
  line-height: 1.2;
}
.updateTime {
  color: #666b7d;
  font-size: 10px;
}
.switchIcon {
  display: inline-block;
  margin-left: 5px;
}
</style>