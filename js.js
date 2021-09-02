function buildJS (prop) {
  let jsStr = `import {BaseTemplate} from '@/components'

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
      if (this.formSearch.title) {
        params.title = this.formSearch.title
      }

      /// todo
      fLoadApi(param).then((res) => {
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
    // 编辑、添加
    fEditOne (row) {
      this.dialogFormType = row.id ? 'edit' : 'add'
      this.dialogFormVisible = true
    },
    // 删除
    fDelOne (row) {
      this.$confirm('确认删除该推荐位配置吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        /// todo
        fDelApi({ id: row.id }).then((res) => {
          this.listLoading = false
          if (res.data.code === 0) {
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
          this.dialogFormVisible = false
          if (this.dialogFormType === 'add') {
            this.fDoSearch()
          } else {
            this.fLoadList()
          }
        } else {
          this.$alert(res.data.message, '提示')
        }
      })
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