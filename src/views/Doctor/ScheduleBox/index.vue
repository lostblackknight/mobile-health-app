<template>
  <div class="container">
    <div class="left">
      <div class="box"></div>
      <div class="box">上午</div>
      <div class="box">下午</div>
    </div>
    <div class="right">
      <div class="item" v-for="d in data" :key="d.scheduleId">
        <div class="box right-item-w">
          <div class="week"><span>{{ d.week }}</span></div>
          <div class="day"><span>{{ d.day }}</span></div>
        </div>
        <div
          @click="handleClick(d.am, d.date, d.week)"
          class="box right-item-w right-item-pos"
          :style="{backgroundColor: d.am !== null && d.am.yuYueState === 1 && d.am.timeType === 'am' ? '#5acf83' : '',color: d.am !== null && d.am.yuYueState === 1 && d.am.timeType === 'am' ? 'white' : ''}"
        >
          <div class="right-item-pos"><span>{{ d.am !== null && d.am.yuYueState === 1 ? '预约' : '' }}</span></div>
        </div>
        <div
          @click="handleClick(d.pm, d.date, d.week)"
          class="box right-item-w right-item-pos"
          :style="{backgroundColor: d.pm !== null && d.pm.yuYueState === 1 && d.pm.timeType === 'pm' ? '#5acf83' : '',color: d.pm !== null && d.pm.yuYueState === 1 && d.pm.timeType === 'pm' ? 'white' : ''}">
          <div class="right-item-pos"><span>{{ d.pm !== null && d.pm.yuYueState === 1 ? '预约' : '' }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScheduleBox',
  props: ['data'],
  methods: {
    handleClick(data, date, week) {
      this.$emit('click', {
        detail: data,
        date: date,
        week: week
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  display: flex
  padding-top: 6px

  .box
    margin: 2px
    width: 26px
    line-height: 26px
    //border: 1px solid black
    height: 48px
    text-align: center
    font-size: 14px
    color: #777
    border-radius: 4px
    background-color: #f8f8f8

  .left
    .box
      writing-mode: tb
      background-color: white

  .right
    display: flex
    white-space: nowrap
    overflow-y: auto

    &::-webkit-scrollbar
      display: none

  .right-item-pos
    padding-top: 6px

  .right-item-w
    width: 60px

    .week
      font-size: 12px

    .day
      position: relative
      top: -6px
      font-size: 14px
      font-weight: bold
      color: #333

</style>
