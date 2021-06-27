<template>
  <div class="select-house">
    <p>
        
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["houselabels"]),
  },
  data() {
    return {
      
    };
  },
  methods: {},
};
</script>

<style scoped>
</style>
