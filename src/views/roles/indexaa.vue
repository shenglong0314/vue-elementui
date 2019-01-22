<template>
  <div>
    <div class="tree">
      <tree/>
    </div>
    <div class="router">
      <h1>{{ roles }}</h1>
    </div>
  </div>
</template>

<script>
import tree from '../tree/index'
export default {
  name: 'Roles',
  components: { tree },
  data() {
    return {
      roles: 'roles'
    }
  }
}
</script>
<style scoped>
  .tree {
    float: left;
    background-color: red;
    width: 30%;
  }
  .router {
    float: left;
    background-color: green;
    width: 70%;
  }
</style>

