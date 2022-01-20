class SearchForm {
  search = {}

  constructor (prop, langPareng, langKey) {
    this.search = prop
    this.langPareng = langPareng
    this.langKey = langKey
  }

  build () {
    let formHtml = ''

    if (this.search.use) {
      let formItems = []
      let item
      for (item of this.search.field) {
        let html = ''
        switch (item.elem) {
          case 'input':
            html = this.inputHtml(item)
            break
          case 'select':
            html = this.selectHtml(item)
            break
          case 'date-picker':
            html = this.datePickerHtml(item)
            break
        }

        html = `
        <el-form-item>${html}</el-form-item>`

        formItems.push(html)
      }

      if (!this.search.autoSearch) {
        formItems.push(`
        <el-form-item>
          <el-button type="primary" size="small" @click="fDoSearch">{{ $t('common.searchBtn') }}</el-button>
        </el-form-item>`)
      }

      if (this.search.action && this.search.action.length) {
        let item
        for (item of this.search.action) {
          let lang = item.lang || `${this.langPareng}.${this.langKey}.search.${item.action}Action`
          formItems.push(`
        <el-form-item>
          <el-button type="${item.type}" size="small" @click="${item.click}">{{ $t('${lang}') }}</el-button>
        </el-form-item>`)
        }
      }

      formItems = formItems.join(`
`)

      formHtml = `
      <el-form :inline="true" :model="${this.search.model}" size="small">${formItems}
      </el-form>
    `
    }

    return formHtml
  }

  inputHtml (attr) {
    let lang = attr.lang || `${this.langPareng}.${this.langKey}.search.${attr.model}`
    let html = `
          <el-input v-model="${this.search.model}.${attr.model}" clearable :placeholder="$t('${lang}')"></el-input>
        `

    return html
  }

  selectHtml (attr) {
    let lang = attr.lang || `${this.langPareng}.${this.langKey}.search.${attr.model}`
    let html = `
          <el-select v-model="${this.search.model}.${attr.model}" clearable :placeholder="$t('${lang}')">
            <el-option
              v-for="item in ${attr.source}"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        `

    return html
  }

  datePickerHtml (attr) {
    let html = `
          <el-date-picker
            v-model="${this.search.model}.${attr.model}"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            :range-separator="$t('common.datepicker.rang')"
            :start-placeholder="$t('common.datepicker.start')"
            :end-placeholder="$t('common.datepicker.end')"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        `

    return html
  }
}

module.exports = SearchForm
