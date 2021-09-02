function buildData ({page, source}) {
  let str = `let oData = {}
`
  if (page.search.use) {
    str += `
oData.${page.search.model} = {}
`
    let item
    for (item of page.search.field) {
      str += `oData.${page.search.model}.${item.model} = ${item.default}
`
    }
  }

  if (page.table.userPagination) {
    str += `
oData.${page.table.pageInfo} = {
  total: 0,
  size: 10,
  page: 1
}
`
  }

  if (source && source.length) {
    let dataSource = []
    let sourceItem
    for (sourceItem of source) {
      let valueItem
      let valueStr = []
      for (valueItem of sourceItem.value) {
        valueStr.push(`{label: '${valueItem.label}', value: ${valueItem.value}}`)
      }
      valueStr = valueStr.join(`,
  `)

      dataSource.push(`oData.${sourceItem.key} = [
  ${valueStr}
]
`)
    }

    dataSource = dataSource.join(`
`)
      str += `
${dataSource}`
  }

  str += `
oData.${page.table.loading} = false
oData.${page.table.model} = []

oData.dialogFormType = 'add'
oData.dialogFormVisible = false

oData.${page.dialog.model} = {}
oData.${page.dialog.model}.id = ''
`

let item
for (item of page.dialog.field) {
  str += `oData.${page.dialog.model}.${item.model} = ${item.default}
`
}

  str += `
export default oData
`

  return str
}

module.exports = buildData
