const fs = require('fs')

const pageBuild = require('./build.json')
const SearchForm = require('./lang/searchForm')
const Table = require('./lang/table')
const Dialog = require('./lang/dialog')
const buildJS = require('./lang/js')
const buildData = require('./lang/data')
const buildLang = require('./lang/lang')

const SearchFormObj = new SearchForm(pageBuild.page.search, pageBuild.langPareng, pageBuild.langKey)
const SearchFormHtml = SearchFormObj.build()

const TableObj = new Table(pageBuild.page.table, pageBuild.langPareng, pageBuild.langKey)
const TableHtml = TableObj.build()

const DialogObj = new Dialog(pageBuild.page.dialog, pageBuild.langPareng, pageBuild.langKey)
const DialogHtml = DialogObj.build()

let pageChange = ''
if (pageBuild.page.table.userPagination) {
  pageChange = `:page-info="${pageBuild.page.table.pageInfo}"
    @page-change="fPageChange"`
}

const pageHtml = `<template>
  <BaseTemplate
    :title="$t('${pageBuild.langPareng}.${pageBuild.langKey}.title')"
    ${pageChange}
    :downloadVisible="false">
    <div slot="header">${SearchFormHtml}</div>

    <div slot="table">
      ${TableHtml}
    </div>

    ${DialogHtml}
  </BaseTemplate>
</template>

<script>
import ${pageBuild.pageName} from './js/${pageBuild.pageName}'

export default ${pageBuild.pageName}
</script>

<style lang="scss">
</style>
`

const jsStr = buildJS(pageBuild.js, pageBuild.langPareng, pageBuild.langKey)
const dataStr = buildData(pageBuild)
const langStr = buildLang(pageBuild)

const target = `dist/${pageBuild.pageName}`
const pageFile = `${target}/${pageBuild.pageName}.vue`
const jsFileDir = `${target}/js/${pageBuild.pageName}`

fs.mkdir(target, (err) => {
  if (err) {
    return console.log(err)
  } else {
    fs.writeFile(pageFile, pageHtml, (err) => {
      if(err) {
        return console.log(err)
      } else {
        console.log('The vue was saved!')
    
        fs.mkdir(`${target}/js`, (err) => {
          if (err) {
            return console.log(err)
          } else {
            fs.mkdir(jsFileDir, (err) => {
              if (err) {
                return console.log(err)
              } else {
                console.log('The dir was saved!')
                const jsFile = `${jsFileDir}/index.js`
                const dataFile = `${jsFileDir}/data.js`
                const langFile = `${target}/lang.js`
    
                fs.writeFile(jsFile, jsStr, (err) => {
                  if (err) {
                    return console.log(err)
                  } else {
                    console.log('The data was saved!')
                  }
                })
    
                fs.writeFile(dataFile, dataStr, (err) => {
                  if (err) {
                    return console.log(err)
                  } else {
                    console.log('The data was saved!')
                  }
                })
    
                fs.writeFile(langFile, langStr, (err) => {
                  if (err) {
                    return console.log(err)
                  } else {
                    console.log('The lang was saved!')
                  }
                })
              }
            })
          }
        })
      }
    })
  }
})

