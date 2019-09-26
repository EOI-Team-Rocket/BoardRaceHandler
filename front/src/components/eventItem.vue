<template>
  <div class="listRow">
    <div>
      <span class="eventProperty">{{event.title}}</span>
    </div>
    <div>
      <span class="eventProperty">{{event.date}}</span>
    </div>
    <div>
      <span class="eventProperty">{{event.place}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "eventItem",
  props: ["event"]
};
</script>

<style scoped>
.listRow {
  display: flex;
}
.listRow * {
  flex-grow: 1;
  flex-basis: 25%;
}
.eventProperty{
  size: 150%;
}
</style>
