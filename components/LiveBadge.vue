<template>
  <div :class="{ 'live-container': true, 'is-live': is_live }">
    <div
      v-if="is_live"
      class="circle"
    ></div>
    <span class="status">{{is_live ? 'Live' : 'No Live'}}</span>
  </div>
</template>

<script>
import _ from 'lodash'
import { DateTime } from 'luxon'

export default {
  props: ['config'],
  data() {
    return {
      is_live: true,
    }
  },
  mounted() {
    const { start_live, end_live } = this.config
    if (start_live && end_live) {
      const start = DateTime.fromISO(start_live)
      const end = DateTime.fromISO(end_live)
      const now = DateTime.local()

      this.is_live = now <= end && now >= start
    }
  }
}
</script>

<style lang="scss" scoped>
.live-container {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 4px;
  background: #666666;
  color: white;
}
.circle {
  background: white;
  width: 10px;
  height: 10px;
  border-radius: 100%;
}
.status {
  font-size: 14px;
}

.is-live {
  background: red;
  .circle {
    animation: 2s blink ease-in-out infinite;
  }
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
