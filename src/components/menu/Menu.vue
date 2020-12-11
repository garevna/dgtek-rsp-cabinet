<template>
  <v-menu v-model="isOpened" bottom left :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" @click="isOpened = true">
        <v-icon large>mdi-format-list-bulleted-square</v-icon>
      </v-btn>
    </template>

    <v-treeview
      class="drop-down-menu"
      dense
      :items="options.items"
      open-on-click
    >
      <template slot="label" slot-scope="{ item }">
         <a @click="toRoute(item)" class="item-link pa-4">{{ item.text }}</a>
      </template>
    </v-treeview>
  </v-menu>
</template>

<style lang="scss">
@import "@/sass/variables.scss";
.v-treeview-node__label {
  cursor: pointer;
  /* color:yellow; */
}
.v-treeview-node__root .v-treeview-node__content {
  cursor: pointer;
}
// .v-treeview-node__children {
//   color: #fff;
// }
.mdi-menu-down::before {
  color: $secondary;
}
.drop-down-menu {
  background-color: #fff;
}
.item-link {
  font-size: 18px;
}
.item-link:hover {
  color:red;
  text-decoration: underline;
}
</style>

<script>
export default {
  props: ['options', 'callBack'],
  name: 'Menu',
  components: {
  },
  data () {
    return {
      selection: 0,
      isOpened: false
    }
  },
  computed: {
  },
  methods: {
    toRoute (type) {
      if (!this.options.nodesName.includes(type.name)) {
        this.callBack({ name: type.name })
        this.isOpened = false
      } else {
        this.isOpened = true
      }
    }
  },
  mounted () {
  }
}
</script>
