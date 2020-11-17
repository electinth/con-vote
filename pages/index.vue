<template>
  <div class="container">
    <Header />

    <h1 class="title-header">
      <span v-if="config.test">(Test)</span>โหวตผ่าน-ไม่ผ่าน 7 มติแก้รัฐธรรมนูญ
    </h1>

    <LiveBadge :config="config"></LiveBadge>

    <div class="filter-box-wrap">
      <el-select v-model="value" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="`${item.label} (${item.total})`"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <div class="legend-wrap">
        <div class="legend">
          <div class="circle"></div>
          <p class="text">รับ</p>
        </div>
        <div class="legend">
          <div class="circle"></div>
          <p class="text">ไม่รับ</p>
        </div>
        <div class="legend">
          <div class="circle"></div>
          <p class="text">งดออกเสียง</p>
        </div>
        <div class="legend">
          <div class="circle"></div>
          <p class="text">ขาดประชุม</p>
        </div>
      </div>
    </div>

    <div class="wrapper">
      <table id="vote-log-table">
        <th v-for="(h, index) in header" :key="index" class="header">
          <el-popover
            v-if="index !== 0"
            placement="bottom"
            :width="index == 7 ? 500 : 200"
            trigger="hover"
            class="detail-box"
          >
            <p v-html="viewDetail(h.key)"></p>
            <div slot="reference">
              {{ h.label }}
              <div class="chart-warp">
                <div
                  v-for="i in 4"
                  :key="i"
                  class="chart"
                  :style="{ width: calPercent(con_votes[index - 1], i) }"
                ></div>
              </div>
              <div class="legend-wrap">
                <div v-for="i in 4" :key="i" class="legend">
                  <div class="circle"></div>
                  <p class="text">
                    {{ (con_votes[index - 1] || {})[i] || 0 }}
                  </p>
                </div>
              </div>
            </div>
          </el-popover>
          <template v-else>
            {{ h.label }}
          </template>
        </th>
        <tr v-for="d in table_data" :key="'section' + d.id">
          <td class="full-name">
            {{ d.fullname }}
          </td>
          <td>
            <div class="circle-wrap">
              <div
                :class="{ circle: true, 'is-fresh': d.con_1_is_fresh }"
                :style="{ background: setColor(d.con_1) }"
              />
            </div>
          </td>
          <td>
            <div class="circle-wrap">
              <div
                :class="{ circle: true, 'is-fresh': d.con_2_is_fresh }"
                :style="{ background: setColor(d.con_2) }"
              />
            </div>
          </td>
          <td>
            <div class="circle-wrap">
              <div
                :class="{ circle: true, 'is-fresh': d.con_3_is_fresh }"
                :style="{ background: setColor(d.con_3) }"
              />
            </div>
          </td>
          <td>
            <div class="circle-wrap">
              <div
                :class="{ circle: true, 'is-fresh': d.con_4_is_fresh }"
                :style="{ background: setColor(d.con_4) }"
              />
            </div>
          </td>
          <td>
            <div class="circle-wrap">
              <div
                :class="{ circle: true, 'is-fresh': d.con_5_is_fresh }"
                :style="{ background: setColor(d.con_5) }"
              ></div>
            </div>
          </td>
          <td>
            <div class="circle-wrap">
              <div
                :class="{ circle: true, 'is-fresh': d.con_6_is_fresh }"
                :style="{ background: setColor(d.con_6) }"
              ></div>
            </div>
          </td>
          <td>
            <div class="circle-wrap">
              <div
                :class="{ circle: true, 'is-fresh': d.con_7_is_fresh }"
                :style="{ background: setColor(d.con_7) }"
              ></div>
            </div>
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
import Header from '@/components/Header'
const CONFIG_URL = 'https://elect.in.th/con-vote/data/config.json'

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
    Header,
  },
  data() {
    return {
      config: {
        test: false,
        live_vote_url: 'https://elect.in.th/con-vote/data/live_vote.json',
        test_live_vote_url:
          'https://elect.in.th/con-vote/data/live_vote_dev.json',
      },
      header: [
        { label: 'ชื่อ', key: 'name' },
        { label: 'ร่างเพื่อไทย 1', key: 'con-2' },
        { label: 'ร่างรัฐบาล', key: 'con-1' },
        { label: 'ร่างเพื่อไทย 2', key: 'con-3' },
        { label: 'ร่างเพื่อไทย 3', key: 'con-4' },
        { label: 'ร่างเพื่อไทย 4', key: 'con-5' },
        { label: 'ร่างเพื่อไทย 5', key: 'con-6' },
        { label: 'ร่างประชาชน', key: 'con-7' },
      ],
      // master data
      live_vote: [],
      // filtered data derived from "live_data"
      data: [],
      options: [],
      value: 'ทั้งหมด',
      content: '',
      content_details: [
        {
          key: 'con-1',
          title: 'ร่างรัฐบาล',
          content:
            'ตั้งสภาร่างรัฐธรรมนูญ<br/>จำนวน 200 คน<br/>มาจากการเลือกตั้ง 150 คน<br/>(โดยใช้จังหวัดเป็นเขตเลือกตั้ง)<br/>และสรรหาอีก 50 คน / ห้าม<br/>แก้ไขหมวด 1 และ 2',
        },
        {
          key: 'con-2',
          title: 'ร่างเพื่อไทย 1',
          content:
            'ตั้งสภาร่างรัฐธรรมนูญ<br/>จำนวน 200 คน มาจาก<br/> การเลือกตั้งทั้งหมด <br/> (โดยใช้จังหวัดเป็นเขตเลือกตั้ง)<br/> / ห้ามแก้ไขหมวด 1 และ 2',
        },
        {
          key: 'con-3',
          title: 'ร่างเพื่อไทย 2',
          content:
            'ยกเลิกที่มาของวุฒิสภา<br/>ชุดพิเศษของคสช.<br/> และอำนาจในการร่วมพิจารณา<br/>ร่างกฎหมายที่ถูกยับยั้งไว้',
        },
        {
          key: 'con-4',
          title: 'ร่างเพื่อไทย 3',
          content:
            'ให้นายกรัฐมนตรีมาจาก<br/>บัญชีรายชื่อที่พรรคการเมือง<br/>เสนอ หรือ ส.ส. บัญชีรายชื่อ<br/>หรือ ส.ส. จากพรรคที่มี ส.ส.<br/>ไม่น้อยกว่าร้อยละ 5 ',
        },
        {
          key: 'con-5',
          title: 'ร่างเพื่อไทย 4',
          content:
            'ยกเลิกบทบัญญัติที่ให้การ<br/>รับรองประกาศ-คำสั่งคสช.<br/>และคำสั่งหัวหน้าคสช. รวมถึง<br/>การกระทำที่เกี่ยวข้องให้ชอบ<br/>ด้วยกฎหมาย',
        },
        {
          key: 'con-6',
          title: 'ร่างเพื่อไทย 5',
          content:
            'ให้ใช้ระบบเลือกตั้งแบบมีบัตร<br/>เลือกตั้งสองใบ เลือกทั้ง<br/>คน-เลือกทั้งพรรค',
        },
        {
          key: 'con-7',
          title: 'ร่างประชาชน',
          content: `๐ ยกเลิกช่องทางนายกฯคนนอก และให้นายกฯ ต้องเป็น ส.ส. </br>
              ๐ ยกเลิกที่มาและอำนาจ ส.ว.ชุดพิเศษของคสช. และให้ ส.ว. มาจากการเลือกตั้ง </br>
              ๐ ยกเลิกแผนยุทธศาสตร์ชาติและแผนปฏิรูปที่คสช. เขียน </br>
              ๐ ยกเลิกบทบัญญัติที่ให้การรับรองประกาศ-คำสั่งคสช. และคำสั่งหัวหน้าคสช.<br/>&emsp;รวมถึงการกระทำที่เกี่ยวข้องให้ชอบด้วยกฎหมาย </br>
              ๐ ยกเลิกที่มาของผู้บริหารท้องถิ่นรูปแบบพิเศษที่ไม่ได้มาจากการเลือกตั้ง </br>
              ๐ ให้ "เซ็ตซีโร่" องค์กรอิสระและศาลรัฐธรรมนูญ </br>
              ๐ ให้การแก้ไขรัฐธรรมนูญใช้เพียงเสียงเกินกึ่งหนึ่งของสองสภา </br>
              ๐ ให้จัดทำรัฐธรมนูญใหม่ โดย สสร. ที่มาจากการเลือกตั้งจำนวน 200`,
        },
      ],
      con_votes: [],
    }
  },
  computed: {
    default_options() {
      return [
        {
          value: 'ทั้งหมด',
          label: 'ทั้งหมด',
          total: this.live_vote.length,
        },
        {
          value: 'ส.ว.',
          label: 'ส.ว. ทั้งหมด',
          total: _.filter(this.live_vote, (i) => i.party === 'ส.ว.').length,
        },
        {
          value: 'ส.ส.',
          label: 'ส.ส. ทั้งหมด',
          total: _.filter(this.live_vote, (i) => i.party !== 'ส.ว.').length,
        },
        {
          value: 'ฝ่ายค้าน',
          label: 'ส.ส. ฝ่ายค้าน',
          total: _.filter(this.live_vote, (i) => i.team === 'ฝ่ายค้าน').length,
        },
        {
          value: 'ฝ่ายรัฐบาล',
          label: 'ส.ส. ฝ่ายรัฐบาล',
          total: _.filter(this.live_vote, (i) => i.team === 'ฝ่ายรัฐบาล')
            .length,
        },
      ]
    },
    table_data() {
      if (this.value === 'ทั้งหมด') {
        return this.live_vote
      } else if (this.value === 'ส.ว.') {
        return this.live_vote.filter((d) => {
          return d.party === this.value
        })
      } else if (this.value === 'ส.ส.') {
        return this.live_vote.filter((d) => {
          return d.party !== 'ส.ว.'
        })
      } else if (this.value === 'ฝ่ายค้าน') {
        return this.live_vote.filter((d) => {
          return d.team === this.value
        })
      } else if (this.value === 'ฝ่ายรัฐบาล') {
        return this.live_vote.filter((d) => {
          return d.team === this.value
        })
      } else {
        return this.live_vote.filter((d) => {
          return d.party === this.value
        })
      }
    },
  },

  async created() {
    // Refresh data from source every 5 minutes
    setInterval(() => {
      this.fetchConfig()
    }, 5 * 60 * 1000)

    // Refresh data from source every 15 seconds
    this.fetchLive()
    setInterval(() => {
      this.fetchLive()
    }, 15 * 1000)
  },

  async asyncData({ params, $axios, config_url }) {
    // For development: Need to bypass CORS using extension
    // @see https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc/related
    const config = await $axios.$get(CONFIG_URL)
    return { config }
  },

  methods: {
    async fetchConfig() {
      // For development: Need to bypass CORS using extension
      // @see https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc/related
      this.config = await this.$axios.$get(CONFIG_URL)
    },

    async fetchLive() {
      const is_first_fetch = this.live_vote.length === 0
      const is_test = _.get(this.config, 'test') || false

      // For development: Need to bypass CORS using extension
      // @see https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc/related
      const live_data_url = _.get(
        this.config,
        is_test ? 'test_live_vote_url' : 'live_vote_url'
      )
      this.live_vote = await this.$axios.$get(live_data_url)
      // this.live_vote = await this.$axios.$get('https://elect.in.th/con-vote/data/live_vote.json')
      const now = DateTime.local()
      const keys = [
        'con_1',
        'con_2',
        'con_3',
        'con_4',
        'con_5',
        'con_6',
        'con_7',
      ]
      this.live_vote.forEach((person) => {
        person.type = person.team + '/' + person.party
        person.fullname = `${person.title} ${person.name} ${person.lastname}`
        // calculate "fresh vote" to show as blinking effect
        keys.forEach((con) => {
          person[`${con}_is_fresh`] = isFresh(person, con)
        })
      })

      // Intiailize filter
      if (is_first_fetch) {
        this.setFilter()
      }

      this.setConVoteTotal()
    },

    setFilter() {
      let group_party = _.groupBy(this.live_vote, 'party')
      for (const key in group_party) {
        if (key !== 'ส.ว.') {
          this.options.push({
            value: key,
            label: `พรรค ${key}`,
            total: group_party[key].length,
          })
        }
      }
      this.options = [...this.default_options, ...this.options]
    },

    setConVoteTotal() {
      const cons = Array.from(Array(7).keys())

      this.con_votes = _.map(cons, (c, index) => {
        let group = _.groupBy(this.table_data, `con_${index + 1}`)
        group = _.omit(group, ['', '#REF!'])
        group = {
          1: group[1] || [],
          2: group[2] || [],
          3: group[3] || [],
          4: group[4] || [],
        }
        let obj = {}
        let count = 0
        for (const key in group) {
          obj[key] = group[key].length
          count = count + group[key].length
          obj['count'] = count
        }
        return obj
      })
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
        color = '#E3E3E3'
      }
      return color
    },

    calPercent(con, i) {
      const value = (con || {})[i] || 0
      const total = (con || {}).count || value

      const result = (value / total) * 100
      return result + '%'
    },

    viewDetail(key) {
      const found = this.content_details.find((element) => element.key === key)
      if (found !== undefined) {
        return found.content
      }
    },
  },
  watch: {
    value() {
      this.setConVoteTotal()
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 1440px;
  min-height: 100vh;
  text-align: center;
  padding: 30px 5%;
}
.title-header {
  margin-top: 60px;
}
.filter-box-wrap {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}
.legend-wrap {
  display: flex;
  padding-left: 20px;
  .legend {
    display: flex;
    align-items: center;
    margin: 0 10px;
    .circle {
      width: 15px;
      height: 15px;
      border-radius: 100%;
      margin-right: 10px;
    }
    .text {
      font-size: 1.4rem;
      font-weight: 700;
    }
  }
  .legend:nth-child(1) {
    .circle {
      background: $green-100;
    }
  }
  .legend:nth-child(2) {
    .circle {
      background: $red-100;
    }
  }
  .legend:nth-child(3) {
    .circle {
      background: $blue-100;
    }
  }
  .legend:nth-child(4) {
    .circle {
      background: $grey-100;
    }
  }
}

::v-deep.el-select .el-input.is-focus .el-input__inner,
::v-deep.el-select .el-input__inner:focus,
.el-input__inner:focus {
  border-color: $grey-200;
}
.el-select-dropdown__item {
  font-size: 1.8rem;
  color: #000;
}
.el-select-dropdown__item.selected {
  color: #000;
}
.el-select-dropdown__item:hover {
  background: rgba($color: $yellow-100, $alpha: 0.5);
}
::v-deep.el-select .el-input {
  width: 250px;
}
::v-deep.el-select .el-input__inner {
  border-color: black;
  font-family: 'NotoSansThai', 'NotoSans' !important;
  font-size: 1.8rem;
  font-weight: 700;
  color: #000;
}
.el-select-dropdown__item.hover {
  background: rgba($color: $yellow-100, $alpha: 0.5);
}
.wrapper {
  margin: 40px 0;
  .circle-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    .circle {
      width: 10px;
      height: 10px;
      border-radius: 100%;
      &.is-fresh {
        animation: 1s blink ease-out infinite;
      }
    }
  }

  .header {
    cursor: pointer;
    width: 150px;
    max-width: 150px;
    .chart-warp {
      width: 100%;
      display: flex;
      margin-top: 5px;
      .chart {
        height: 3px;
        width: 100%;
      }
      .chart:nth-child(1) {
        background: $green-100;
      }
      .chart:nth-child(2) {
        background: $red-100;
      }
      .chart:nth-child(3) {
        background: $blue-100;
      }
      .chart:nth-child(4) {
        background: $grey-100;
      }
    }
    .legend-wrap {
      padding-left: 0;
      justify-content: space-around;
      .legend {
        display: flex;
        align-items: center;
        margin: 0 4px;
        .circle {
          display: flex;
          align-items: center;
          width: 5px;
          height: 5px;
          margin-right: 3px;
          border-radius: 50%;
        }
        .text {
          font-size: 1rem;
        }
      }
    }
  }

  .header:nth-child(1),
  .full-name {
    min-width: 300px;
    max-width: 300px;
  }

  #vote-log-table th,
  #vote-log-table td {
    font-size: 1.6rem;
    color: #000;
    border: 1px solid black;
    padding: 8px 15px;
    text-align: left;
  }
  #vote-log-table th {
    font-weight: 700;
    padding-top: 12px;
    padding-bottom: 12px;
    background: white;
    position: sticky;
    top: 55px;
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
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
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
