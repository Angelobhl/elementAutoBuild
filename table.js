class Table {
  table = {}
  constructor (prop) {
    this.table = prop
  }

  build () {
    let tableHtml = ''
    let tableFieldHtml = []
    let item
    for (item of this.table.fields) {
      let width = ''
      let itemHtml = ''
      if (item.width) {
        width = ` width="${item.width}"`
      }

      switch (item.type) {
        case 'string':
          itemHtml = `<el-table-column align="center" prop="${item.prop}" label="${item.label}" ${width}></el-table-column>`
          break
        case 'fun':
          itemHtml = `<el-table-column align="center" label="${item.label}" ${width}>
          <template slot-scope="${item.scope}">{{ ${item.template} }}</template>
        </el-table-column>`
          break
        case 'action':
          let actionHtml = []
          let actionItem
          for (actionItem of item.action) {
            actionHtml.push(`<el-button type="text" size="mini" @click="${actionItem.click}">${actionItem.title}</el-button>`)
          }
          actionHtml = actionHtml.join(`
            `)

          itemHtml = `<el-table-column align="center" label="${item.label}" ${width}>
          <template slot-scope="${item.scope}">
            ${actionHtml}
          </template>
        </el-table-column>`
          break
      }

      tableFieldHtml.push(itemHtml)
    }

    tableFieldHtml = tableFieldHtml.join(`
        `)

    tableHtml = `<el-table v-loading="${this.table.loading}" :data="${this.table.model}" border size="mini" style="width: 100%">
        ${tableFieldHtml}
      </el-table>`

    return tableHtml
  }
}

module.exports = Table