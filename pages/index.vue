<template>
  <div class="container">
    <h1>โค้งสุดท้าย 7 มติแก้รัฐธรรมนูญ</h1>
    <LiveBadge :config="config"></LiveBadge>
    <div class="wrapper">
      <table id="vote-log-table">
        <th v-for="(h, index) in header" :key="index">
          {{ h }}
        </th>
        <tr v-for="d in live_vote" :key="'section' + d.id" class="grid-row">
          <td>
            {{ d.fullname }}
          </td>
          <td>
            <div
              :class="{ circle: true, 'is-fresh': d.con_1_is_fresh }"
              :style="{ background: setColor(d.con_1) }"
            ></div>
          </td>
          <td>
            <div
              :class="{ circle: true, 'is-fresh': d.con_2_is_fresh }"
              :style="{ background: setColor(d.con_2) }"
            ></div>
          </td>
          <td>
            <div
              :class="{ circle: true, 'is-fresh': d.con_3_is_fresh }"
              :style="{ background: setColor(d.con_3) }"
            ></div>
          </td>
          <td>
            <div
              :class="{ circle: true, 'is-fresh': d.con_4_is_fresh }"
              :style="{ background: setColor(d.con_4) }"
            ></div>
          </td>
          <td>
            <div
              :class="{ circle: true, 'is-fresh': d.con_5_is_fresh }"
              :style="{ background: setColor(d.con_5) }"
            ></div>
          </td>
          <td>
            <div
              :class="{ circle: true, 'is-fresh': d.con_6_is_fresh }"
              :style="{ background: setColor(d.con_6) }"
            ></div>
          </td>
          <td>
            <div
              :class="{ circle: true, 'is-fresh': d.con_7_is_fresh }"
              :style="{ background: setColor(d.con_7) }"
            ></div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { DateTime, Interval } from 'luxon'
import LiveBadge from '@/components/LiveBadge'
import config from '@/data/config.json'

function isFresh(person, key) {
  const keyUpdatedAt = `${key}_updated_at`
  if (!person[key] || !person[keyUpdatedAt]) return false
  const now = DateTime.local()
  const update = DateTime.fromISO(person[keyUpdatedAt])
  const interval = Interval.fromDateTimes(update, now)
  if (!interval.isValid) return false
  // Fresh if it just updated within 2 minutes
  return interval.length('minutes') < 2
}

export default {
  components: {
    LiveBadge
  },
  data() {
    return {
      config,
      header: [
        'ชื่อ',
        'ร่างเพื่อไทย',
        'ร่างเพื่อไทย',
        'ร่างเพื่อไทย',
        'ร่างเพื่อไทย',
        'ร่างเพื่อไทย',
        'ร่างเพื่อไทย',
        'ร่างเพื่อไทย',
      ],
      people: [
        {
          id: 1,
          title: 'นาย',
          name: 'สุชาติ',
          lastname: 'โชคชัยวัฒนากร',
          team: 'ฝ่ายรัฐบาล',
          party: 'ภูมิใจไทย',
          votelog_con_1: 1,
          votelog_con_2: 2,
          votelog_con_3: 3,
          votelog_con_4: 4,
          votelog_con_5: 5,
          votelog_con_6: 5,
          votelog_con_7: 5,
        },
        {
          id: 2,
          title: 'นาย',
          name: 'สุชาติ',
          lastname: 'โชคชัยวัฒนากร',
          team: 'ฝ่ายค้าน',
          party: 'เพื่อไทย',
          votelog_con_1: 2,
          votelog_con_2: 3,
          votelog_con_3: 4,
          votelog_con_4: 5,
          votelog_con_5: 1,
          votelog_con_6: 2,
          votelog_con_7: 3,
        },
        {
          id: 3,
          title: 'นาย',
          name: 'สุชาติ',
          lastname: 'โชคชัยวัฒนากร',
          team: '-',
          party: 'ส.ว.',
          votelog_con_1: 3,
          votelog_con_2: 4,
          votelog_con_3: 5,
          votelog_con_4: 1,
          votelog_con_5: 2,
          votelog_con_6: 3,
          votelog_con_7: 4,
        },
      ],
      live_vote: [],
    }
  },
  created() {
    // Refresh data from source every 30 seconds
    setInterval(() => {
      this.$fetch()
    }, 30 * 1000)
  },

  async fetch() {
    // For development: Need to bypass CORS using extension
    // @see https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc/related
    this.live_vote = await this.$axios.$get('https://elect.in.th/con-vote/data/live_vote.json')
    const now = DateTime.local()
    const keys = ['con_1', 'con_2', 'con_3', 'con_4', 'con_5', 'con_6', 'con_7']
    this.live_vote[1].con_2_updated_at = DateTime.local().minus({ minutes: 1 }).toISO()
    this.live_vote.forEach((person) => {
      person.type = person.team + '/' + person.party
      person.fullname = `${person.title} ${person.name} ${person.lastname}`
      keys.forEach(con => {
        person[`${con}_is_fresh`] = isFresh(person, con)
      })
    })
  },
  fetchOnServer: false,
  methods: {
    setColor(data) {
      let color = ''
      if (data === '1') {
        color = '#76C8B8'
      } else if (data === '2') {
        color = '#F0324B'
      } else if (data === '3') {
        color = '#2D3480'
      } else if (data === '4') {
        color = '#7B90D1'
      } else if (data === '5') {
        color = '#E3E3E3'
      }
      return color
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
  padding: 45px 0;
}
.wrapper {
  padding: 50px;
  .circle {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    &.is-fresh {
      animation: 1s blink ease-out infinite;
    }
  }
  #vote-log-table th,
  #vote-log-table td {
    font-family: 'NotoSansThai';
    font-size: 1.4rem;
    color: #000;
    border: 1px solid $grey-200;
    padding: 8px 15px;
    text-align: left;
  }
  #vote-log-table th {
    font-weight: 700;
    background-color: $grey-100;
    padding-top: 12px;
    padding-bottom: 12px;
  }
  #vote-log-table td {
    font-weight: 400;
  }
  #vote-log-table {
    border-collapse: collapse;
    width: 100%;
  }
  #vote-log-table tr:hover {
    background-color: $grey-50;
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
