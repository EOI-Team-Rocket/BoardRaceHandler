<template>
  <div class="listRow">
    <div>
      <span>{{event.title}}</span>
    </div>
    <div>
      <span class="eventProperty">{{event.date}}</span>
    </div>
    <div>
      <span>{{event.place}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "eventItem",
  props: ["event"]
};
</script>

<style>
.listRow {
  display: flex;
}
.listRow * {
  flex-grow: 1;
  flex-basis: 25%;
}
span {
  size: 150%;
}
</style>
