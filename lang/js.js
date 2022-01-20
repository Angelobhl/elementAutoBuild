function buildJS (prop, langPareng, langKey) {
  let jsStr = `import {BaseTemplate} from '@/components'
import QS from 'qs'

import oData from './data'

export default {
  name: '${prop.name}',

  data () {
    return oData
  },

  components: {
    BaseTemplate
  },

  methods: {
    // 加载列表
    fLoadList () {
      this.listLoading = true

      let param = {
        size: this.pageInfo.size,
        page: this.pageInfo.page
      }

      /// todo
      fLoadApi(Object.assign(param, this.fSearchParams())).then((res) => {
        this.listLoading = false
        if (res.data.code === 0) {
          /// todo
          if (res.data.data.list) {
            this.pageInfo.total = res.data.data.cnt
            this.tableLists = res.data.data.list
          } else {
            this.pageInfo.total = 0
            this.tableLists = []
          }
        }
      })
    },
    // 搜索列表
    fDoSearch () {
      this.pageInfo.page = 1
      this.fLoadList()
    },
    // 页数改变
    fPageChange (param) {
      this.pageInfo.page = param.page
      this.fLoadList()
    },
    // 列表，显示状态
    fShowStatus (row) {
      let str = ''

      let item
      for (item of this.aStatus) {
        if (item.value === +row.status) {
          str = item.label
        }
      }

      return str
    },
    // 编辑、添加
    fEditOne (row) {
      this.dialogFormType = row.id ? 'edit' : 'add'
      this.dialogFormVisible = true
    },
    // 删除
    fDelOne (row) {
      this.$confirm(this.$t('${langPareng}.${langKey}.delConfirm', {name: row.name}), this.$t('common.alert'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        /// todo
        fDelApi({ id: row.id }).then((res) => {
          this.listLoading = false
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: this.$t('common.delSuccess')
            })
            this.pageInfo.total = this.pageInfo.total - 1
            this.pageInfo.page = Math.min(this.pageInfo.page, Math.ceil(this.pageInfo.total / this.pageInfo.size))
            this.fLoadList()
          }
        })
      }).catch(() => {})
    },
    // 表单提交
    fDialogSubmit () {
      /// todo
      this.dialogLoading = true
      fSubmitApi(oPostData, this.dialogFormType).then((res) => {
        this.dialogLoading = false
        if (res.data.code === 0) {
          this.$message({
            type: 'success',
            message: this.$t('common.submitSuccess')
          })
          this.dialogFormVisible = false
          if (this.dialogFormType === 'add') {
            this.fDoSearch()
          } else {
            this.fLoadList()
          }
        } else {
          this.$alert(res.data.message, this.$t('common.alert'))
        }
      })
    },
    // 导出
    fExport () {
      const params = this.fSearchParams()
      const query = QS.stringify(params)
      const url = query ? '?' + query : ''
      console.log(query)

      window.open(url)
    },
    // 获取搜索参数
    fSearchParams () {
      let params = {}

      this.formSearch.title && (params.title = this.formSearch.title)
      this.formSearch.name && (params.name = this.formSearch.name)
      this.formSearch.user.uid && (params.uid = this.formSearch.user.uid)
      this.formSearch.status !== '' && (params.status = this.formSearch.status)

      return params
    }
  },

  created () {
    this.fLoadList()
  }
}
`

  return jsStr
}

module.exports = buildJS