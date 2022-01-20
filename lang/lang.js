function buildLang (pageBuild) {
  let searchStr = []
  let tableStr = []
  let dialogStr = []

  let item
  if (pageBuild.page.search.field.length) {
    for (item of pageBuild.page.search.field) {
      if (!item.lang) {
        searchStr.push(`${item.model}: '${item.placeholder}'`)
      }
    }
  }
  if (pageBuild.page.search.action.length) {
    for (item of pageBuild.page.search.action) {
      if (!item.lang) {
        searchStr.push(`${item.action}Action: '${item.title}'`)
      }
    }
  }

  if (pageBuild.page.table.fields.length) {
    for (item of pageBuild.page.table.fields) {
      if (!item.lang) {
        tableStr.push(`${item.prop}: '${item.label}'`)
        if (item.type === 'action') {
          let action
          for (action of item.action) {
            tableStr.push(`${action.action}Action: '${action.title}'`)
          }
        }
      }
    }
  }

  dialogStr.push(`addTitle: '${pageBuild.page.dialog.addTitle}'`)
  dialogStr.push(`editTitle: '${pageBuild.page.dialog.editTitle}'`)
  if (pageBuild.page.dialog.field.length) {
    for (item of pageBuild.page.dialog.field) {
      if (!item.lang) {
        dialogStr.push(`${item.model}: '${item.label}'`)
        dialogStr.push(`${item.model}Placeholder: '${item.placeholder}'`)
      }
    }
  }

  searchStr = searchStr.join(`,
    `)
  tableStr = tableStr.join(`,
    `)
  dialogStr = dialogStr.join(`,
    `)

  let langStr = `${pageBuild.langKey}: {
  title: '${pageBuild.page.title}',
  search: {
    ${searchStr}
  },
  tableLabel: {
    ${tableStr}
  },
  dialog: {
    ${dialogStr}
  },
  delConfirm: '确认删除游戏【{name}】么？'
}`

  return langStr
}

module.exports = buildLang
