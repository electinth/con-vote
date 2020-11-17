<template>
  <div class="container">
    <h1>โค้งสุดท้าย 7 มติแก้รัฐธรรมนูญ</h1>
    <LiveBadge :config="config"></LiveBadge>

    <div class="filter-box-wrap">
      <el-select v-model="value" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
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
            placement="top-start"
            width="200"
            trigger="hover"
            class="detail-box"
          >
            <p v-html="viewDetail(h.key)"></p>
            <div slot="reference">
              {{ h.label }}
            </div>
          </el-popover>
        </th>
        <tr v-for="d in data" :key="'section' + d.id" class="grid-row">
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
// import live_vote_json from '@/data/config.json'

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
    LiveBadge,
  },
  data() {
    return {
      config,
      header: [
        { label: 'ชื่อ', key: 'name' },
        { label: 'ร่างรัฐบาล', key: 'con-1' },
        { label: 'ร่างเพื่อไทย 1', key: 'con-2' },
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
      content: '',
      content_details: [
        {
          key: 'con-1',
          title: 'ร่างรัฐบาล',
          content:
            'ตั้งสภาร่างรัฐธรรมนูญ จำนวน 200 คน มาจากการเลือกตั้ง 150 คน (โดยใช้จังหวัดเป็นเขตเลือกตั้ง) และสรรหาอีก 50 คน / ห้ามแก้ไขหมวด 1 และ 2',
        },
        {
          key: 'con-2',
          title: 'ร่างเพื่อไทย 1',
          content:
            'ตั้งสภาร่างรัฐธรรมนูญ จำนวน 200 คน มาจากการเลือกตั้ง 150 คน (โดยใช้จังหวัดเป็นเขตเลือกตั้ง) และสรรหาอีก 50 คน / ห้ามแก้ไขหมวด 1 และ 2',
        },
        {
          key: 'con-3',
          title: 'ร่างเพื่อไทย 2',
          content:
            'ตั้งสภาร่างรัฐธรรมนูญจำนวน 200 คน มาจากการเลือกตั้งทั้งหมด (โดยใช้จังหวัดเป็นเขตเลือกตั้ง) / ห้ามแก้ไขหมวด 1 และ 2',
        },
        {
          key: 'con-4',
          title: 'ร่างเพื่อไทย 3',
          content:
            'ให้นายกรัฐมนตรีมาจากบัญชีรายชื่อที่พรรคการเมืองเสนอ หรือ ส.ส.บัญชีรายชื่อ หรือ ส.ส. จากพรรคที่มี ส.ส.ไม่น้อยกว่าร้อยละ 5 ',
        },
        {
          key: 'con-5',
          title: 'ร่างเพื่อไทย 4',
          content:
            'ยกเลิกบทบัญญัติที่ให้การรับรองประกาศ-คำสั่งคสช. และคำสั่งหัวหน้าคสช. รวมถึงการกระทำที่เกี่ยวข้องให้ชอบด้วยกฎหมาย',
        },
        {
          key: 'con-6',
          title: 'ร่างเพื่อไทย 5',
          content:
            'ให้ใช้ระบบเลือกตั้งแบบมีบัตรเลือกตั้งสองใบ เลือกทั้งคน-เลือกทั้งพรรค',
        },
        {
          key: 'con-7',
          title: 'ร่างประชาชน',
          content: `"๐ ยกเลิกช่องทางนายกฯ คนนอก และให้นายกฯ ต้องเป็น ส.ส. </br>
              ๐ ยกเลิกที่มาและอำนาจ ส.ว.ชุดพิเศษของคสช. และให้ ส.ว. มาจากการเลือกตั้ง </br>
              ๐ ยกเลิกแผนยุทธศาสตร์ชาติและแผนปฏิรูปที่คสช. เขียน </br>
              ๐ ยกเลิกบทบัญญัติที่ให้การรับรองประกาศ-คำสั่งคสช. และคำสั่งหัวหน้าคสช. รวมถึงการกระทำที่เกี่ยวข้องให้ชอบด้วยกฎหมาย </br>
              ๐ ยกเลิกที่มาของผู้บริหารท้องถิ่นรูปแบบพิเศษที่ไม่ได้มาจากการเลือกตั้ง </br>
              ๐ ให้ ""เซ็ตซีโร่"" องค์กรอิสระและศาลรัฐธรรมนูญ </br>
              ๐ ให้การแก้ไขรัฐธรรมนูญใช้เพียงเสียงเกินกึ่งหนึ่งของสองสภา </br>
              ๐ ให้จัดทำรัฐธรมนูญใหม่ โดย สสร. ที่มาจากการเลือกตั้งจำนวน 200 "`,
        },
      ],
    }
  },
  created() {
    // Refresh data from source every 15 seconds
    setInterval(() => {
      this.$fetch()
    }, 15 * 1000)
  },

  async fetch() {
    const is_first_fetch = this.live_vote.length === 0
    // For development: Need to bypass CORS using extension
    // @see https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc/related
    this.live_vote = await this.$axios.$get(
      'https://elect.in.th/con-vote/data/live_vote.json'
    )
    const now = DateTime.local()
    const keys = ['con_1', 'con_2', 'con_3', 'con_4', 'con_5', 'con_6', 'con_7']
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

    this.filterPeople()
  },
  fetchOnServer: false,
  methods: {
    setFilter() {
      let group_party = _.groupBy(this.live_vote, 'party')
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
        this.data = this.live_vote
      } else if (this.value === 'ส.ว.') {
        this.data = this.live_vote.filter((d) => {
          return d.party === this.value
        })
      } else if (this.value === 'ส.ส.') {
        this.data = this.live_vote.filter((d) => {
          return d.party !== 'ส.ว.'
        })
      } else if (this.value === 'ฝ่ายค้าน') {
        this.data = this.live_vote.filter((d) => {
          return d.team === this.value
        })
      } else if (this.value === 'ฝ่ายรัฐบาล') {
        this.data = this.live_vote.filter((d) => {
          return d.team === this.value
        })
      } else {
        this.data = this.live_vote.filter((d) => {
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
    viewDetail(key) {
      console.log('view', key)
      const found = this.content_details.find((element) => element.key === key)
      if (found !== undefined) {
        console.log('found', found.content)
        return found.content
      }
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
  padding: 30px 10%;
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
  border-color: $grey-200;
  font-family: 'NotoSansThai' !important;
  font-size: 1.8rem;
  font-weight: 700;
  color: #000;
}
.el-select-dropdown__item.hover {
  background: rgba($color: $yellow-100, $alpha: 0.5);
}

.wrapper {
  margin: 40px 0;
  .circle {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    &.is-fresh {
      animation: 1s blink ease-out infinite;
    }
  }
  .header {
    cursor: pointer;
  }
  #vote-log-table th,
  #vote-log-table td {
    font-size: 1.6rem;
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
