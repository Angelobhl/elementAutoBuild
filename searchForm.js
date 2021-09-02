class SearchForm {
  search = {}

  constructor (prop) {
    this.search = prop
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
          <el-button type="primary" size="small" @click="fDoSearch">搜索</el-button>
        </el-form-item>`)
      }

      if (this.search.action && this.search.action.length) {
        let item
        for (item of this.search.action) {
          formItems.push(`
        <el-form-item>
          <el-button type="${item.type}" size="small" @click="${item.click}">${item.title}</el-button>
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
    let html = `
          <el-input v-model="${this.search.model}.${attr.model}" clearable placeholder="${attr.placeholder}"></el-input>
        `

    return html
  }

  selectHtml (attr) {
    let html = `
          <el-select v-model="${this.search.model}.${attr.model}" clearable placeholder="${attr.placeholder}">
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
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        `

    return html
  }
}

module.exports = SearchForm
