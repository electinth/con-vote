<template>
  <div class="container">
    <h1>โค้งสุดท้าย 7 มติแก้รัฐธรรมนูญ</h1>
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
              class="circle"
              :style="{ background: setColor(d.con_1) }"
            ></div>
          </td>
          <td>
            <div
              class="circle"
              :style="{ background: setColor(d.con_2) }"
            ></div>
          </td>
          <td>
            <div
              class="circle"
              :style="{ background: setColor(d.con_3) }"
            ></div>
          </td>
          <td>
            <div
              class="circle"
              :style="{ background: setColor(d.con_4) }"
            ></div>
          </td>
          <td>
            <div
              class="circle"
              :style="{ background: setColor(d.con_5) }"
            ></div>
          </td>
          <td>
            <div
              class="circle"
              :style="{ background: setColor(d.con_6) }"
            ></div>
          </td>
          <td>
            <div
              class="circle"
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
import live_vote_data from '../static/data/live_vote.json'

export default {
  data() {
    return {
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
    this.live_vote = live_vote_data
    this.live_vote.map((i) => {
      i.type = i.team + '/' + i.party
      i.fullname = `${i.title} ${i.name} ${i.lastname}`
    })
    console.log('this.people', this.live_vote)
  },
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
</style>
