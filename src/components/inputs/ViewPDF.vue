<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    max-width="80%"
  >
    <v-card>
      <v-toolbar dense>
        <h5><small>{{ title }}</small></h5>

        <v-spacer />

        <v-btn icon @click="$emit('update:dialog', false)">
          <v-icon large>mdi-close</v-icon>
        </v-btn>

      </v-toolbar>

      <object
        :data="content"
        type="application/pdf"
        width="100%"
        height="640"
      ></object>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'ViewPDF',

  props: ['dialog', 'content', 'title']
}

</script>
