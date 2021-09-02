class Dialog {
  dialog = {}

  constructor (prop) {
    this.dialog = prop
  }

  build () {
    let formItems = []
    let item
    for (item of this.dialog.field) {
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
        case 'checkbox':
          html = this.checkboxHtml(item)
          break
        case 'radio':
          html = this.radioHtml(item)
          break
          case 'inputNumber':
            html = this.inputNumberHtml(item)
            break
        case 'textarea':
          html = this.textareaHtml(item)
          break
      }

      html = `
        <el-form-item label="${item.label}">${html}</el-form-item>`

      formItems.push(html)
    }

    formItems = formItems.join(`
`)

    let dialogHtml = `<el-dialog :title="dialogFormType === 'add' ? '${this.dialog.addTitle}' : '${this.dialog.editTitle}'" :visible.sync="dialogFormVisible" v-loading="dialogLoading">
      <el-form :model="${this.dialog.model}" size="small" :label-width="'120px'">${formItems}
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="fDialogSubmit">确 定</el-button>
      </div>
    </el-dialog>
`
    return dialogHtml
  }

  inputHtml (attr) {
    let html = `
          <el-input v-model="${this.dialog.model}.${attr.model}" clearable placeholder="${attr.placeholder}"></el-input>
        `

    return html
  }

  selectHtml (attr) {
    let html = `
          <el-select v-model="${this.dialog.model}.${attr.model}" clearable placeholder="${attr.placeholder}">
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
    let html = ''
    switch(attr.type) {
      case 'datetimerange':
        html = `
          <el-date-picker
            v-model="${this.dialog.model}.${attr.model}"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        `
        break
      case 'datetime':
        html = `
          <el-date-picker
            v-model="${this.dialog.model}.${attr.model}"
            format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        `
        break
    }
    

    return html
  }

  checkboxHtml (attr) {
    let html = `
          <el-checkbox-group v-model="${this.dialog.model}.${attr.model}">
            <el-checkbox
              v-for="item in ${attr.source}"
              :label="item.value"
              :key="item.label">
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        `

    return html
  }

  radioHtml (attr) {
    let html = `
          <el-radio-group v-model="${this.dialog.model}.${attr.model}">
            <el-radio
              v-for="item in ${attr.source}"
              :label="item.value"
              :key="item.label">
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        `

    return html
  }

  inputNumberHtml (attr) {
    let html = `
          <el-input-number v-model="${this.dialog.model}.${attr.model}" controls-position="right" :min="${attr.min}" :max="${attr.max}" :step="1" step-strictly></el-input-number>
        `

    return html
  }

  textareaHtml (attr) {
    let html = `
          <el-input type="textarea" :rows="4" v-model="${this.dialog.model}.${attr.model}" placeholder="${attr.placeholder}"></el-input>
        `

    return html
  }
}

module.exports = Dialog