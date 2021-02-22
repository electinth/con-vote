<template>
  <div :class="{ 'live-container': true, [`is-${statusClass}`]: true }">
    <div class="circle"></div>
    <span class="status">{{status}}</span>
  </div>
</template>

<script>
import _ from 'lodash'
import { DateTime } from 'luxon'

export default {
  props: ['config'],
  computed: {
    status: function() {
      const { start_live, end_live } = this.config
      if (start_live && end_live) {
        const start = DateTime.fromISO(start_live)
        const end = DateTime.fromISO(end_live)
        const now = DateTime.local()

        if (now <= end && now >= start) {
          return "Live"
        } else if (now > end) {
          return "Live Ended"
        }
      }
      return "Standby"
    },

    statusClass: function() {
      return _.kebabCase(this.status)
    }
  }
}
</script>

<style lang="scss" scoped>
.live-container {
  position: fixed;
  z-index: 100;
  top: 10px;
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 4px;
  // background: #666666;
  color: #666666;
}
.circle {
  display: none;
  background: white;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  margin-right: 6px;
}
.status {
  font-size: 14px;
}

.is-standby {
  display: none;
}

.is-live {
  background: red;
  color: white;
  .circle {
    display: block;
    animation: 2s blink ease-in-out infinite;
  }
}
.is-live-ended {
  background: #666666;
  color: white;
}

@keyframes blink {
  0% {
    opacity: 1.0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1.0;
  }
}
</style>
