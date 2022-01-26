class Table {
  table = {}
  constructor (prop, langPareng, langKey) {
    this.table = prop
    this.langPareng = langPareng
    this.langKey = langKey
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
      let lang = item.lang || `${this.langPareng}.${this.langKey}.table.${item.prop}`

      switch (item.type) {
        case 'string':
          itemHtml = `<el-table-column align="center" prop="${item.prop}" :label="$t('${lang}')" ${width}></el-table-column>`
          break
        case 'fun':
          itemHtml = `<el-table-column align="center" :label="$t('${lang}')" ${width}>
          <template slot-scope="${item.scope}">{{ ${item.template} }}</template>
        </el-table-column>`
          break
        case 'action':
          let actionHtml = []
          let actionItem
          for (actionItem of item.action) {
            let actionLang = actionItem.lang || `${this.langPareng}.${this.langKey}.table.${actionItem.action}Action`
            actionHtml.push(`<el-button type="text" size="mini" @click="${actionItem.click}">{{ $t('${actionLang}') }}</el-button>`)
          }
          actionHtml = actionHtml.join(`
            `)

          itemHtml = `<el-table-column align="center" :label="$t('${lang}')" ${width}>
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