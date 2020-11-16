<template>
  <div class="container">
    <h1>โค้งสุดท้าย 7 มติแก้รัฐธรรมนูญ</h1>
    <el-select v-model="value" placeholder="Select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <div class="wrapper">
      <table id="vote-log-table">
        <th v-for="(h, index) in header" :key="index">
          {{ h }}
        </th>
        <tr v-for="d in data" :key="'section' + d.id" class="grid-row">
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
      data: [],
      options: [
        {
          value: 'ทั้งหมด',
          label: 'ทั้งหมด',
        },
        {
          value: 'ส.ว.',
          label: 'ส.ว. ทั้งหมด',
        },
        {
          value: 'ส.ส.',
          label: 'ส.ส. ทั้งหมด',
        },
        {
          value: 'ฝ่ายค้าน',
          label: 'ส.ส. ฝ่ายค้าน',
        },
        {
          value: 'ฝ่ายรัฐบาล',
          label: 'ส.ส. ฝ่ายรัฐบาล',
        },
      ],
      value: 'ทั้งหมด',
    }
  },
  created() {
    this.data = live_vote_data
    live_vote_data.map((i) => {
      // i.type = i.team + '/' + i.party
      i.fullname = `${i.title} ${i.name} ${i.lastname}`
    })
    console.log('this.people', live_vote_data)
    this.setFilter()
  },
  methods: {
    setFilter() {
      let group_party = _.groupBy(live_vote_data, 'party')
      for (const key in group_party) {
        if (key !== 'ส.ว.') {
          this.options.push({
            value: key,
            label: `พรรค ${key}`,
          })
        }
      }
      this.options = _.sortBy(this.options, 'id')
    },
    filterPeople() {
      if (this.value === 'ทั้งหมด') {
        this.data = live_vote_data
      } else if (this.value === 'ส.ว.') {
        this.data = live_vote_data.filter((d) => {
          return d.party === this.value
        })
      } else if (this.value === 'ส.ส.') {
        this.data = live_vote_data.filter((d) => {
          return d.party !== 'ส.ว.'
        })
      } else if (this.value === 'ฝ่ายค้าน') {
        this.data = live_vote_data.filter((d) => {
          return d.team === this.value
        })
      } else if (this.value === 'ฝ่ายรัฐบาล') {
        this.data = live_vote_data.filter((d) => {
          return d.team === this.value
        })
      } else {
        this.data = live_vote_data.filter((d) => {
          return d.party === this.value
        })
      }
    },
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
  watch: {
    value() {
      this.filterPeople()
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
