const fs = require('fs')

const pageBuild = require('./build.json')
const SearchForm = require('./searchForm')
const Table = require('./table')
const Dialog = require('./dialog')
const buildJS = require('./js')
const buildData = require('./data')
const buildLang = require('./lang')

const SearchFormObj = new SearchForm(pageBuild.page.search)
const SearchFormHtml = SearchFormObj.build()

const TableObj = new Table(pageBuild.page.table)
const TableHtml = TableObj.build()

const DialogObj = new Dialog(pageBuild.page.dialog)
const DialogHtml = DialogObj.build()

let pageChange = ''
if (pageBuild.page.table.userPagination) {
  pageChange = `:page-info="${pageBuild.page.table.pageInfo}"
    @page-change="fPageChange"`
}

const pageHtml = `<template>
  <BaseTemplate
    :title="'${pageBuild.page.title}'"
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

const jsStr = buildJS(pageBuild.js)
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

