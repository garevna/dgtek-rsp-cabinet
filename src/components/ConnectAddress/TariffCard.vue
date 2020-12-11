<template>
  <!-- <v-card class="col-3"
    > -->
    <!-- @click="$emit('update:selected', index)"
    :class="{ 'price-card-with-border': item.selected, 'price-card': true }"
    <v-img src="@/assets/price-card-image.png" class="price-card-image"></v-img> -->
    <!-- <v-card-text class="mt-2 mt-sm-0" align="center" style="position: relative; z-index: 1">
      <h1 class="price"><sup>$</sup>{{ tariff.price }}<span class="mo">/mo</span></h1>
      <p>{{ tariff.downstreamSpeed }} Mbps Download</p>
      <p>{{ tariff.upstreamSpeed }} Mbps Upload</p>
    </v-card-text>
  </v-card> -->
  <v-hover
    v-slot="{ hover }"
    close-delay="200"
    open-delay="100"
  >
    <v-card
      flat
      class="text-center mt-6 mr-5 transparent tariff-card"
      :elevation="hover ? 16 : 2"
      :class="{ 'on-hover': hover }"
      v-on:click="sendTariff"
    >
      <v-card-title class="pt-4 justify-center">
        <h3>{{ tariff.tariffName }}</h3>
      </v-card-title>
      <v-card-text>
        <p><span class="dollar">{{ tariff.price }}</span><span class="month">/mo</span></p>
      </v-card-text>
      <v-card-text>
        <!-- arrow up -->
        <h3>{{ tariff.upstreamSpeed }} Mbps Upload</h3>
      </v-card-text>
      <v-card-text>
        <!-- arrow down -->
        <h3>{{ tariff.downstreamSpeed }} Mbps Download</h3>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'TariffCard',
  props: ['tariff', 'tariffId', 'tariffName'],
  data: () => ({}),
  methods: {
    sendTariff () {
      this.$emit('update:tariffId', this.tariff._id)
      this.$emit('update:tariffName', this.tariff.tariffName)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/sass/variables.scss";
.description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
.service-name {
  font-size: 25px;
  color: $secondary;
}
.dollar {
  position: relative;
  font-size: 20px;
  color: $primary;
  padding-right: 25px;
}
.month{
  font-size: 20px;
  color: $primary;
}
.dollar::after {
  content: "\0024";
  font-size: 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: $primary;
  right: 0;
}
.cards {
  width: 100%;
  // height: max-content;
  border-radius: 15px;
}
.tariff-card{
  width: 30%;
}
</style>
