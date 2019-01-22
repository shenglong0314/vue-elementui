<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom: 20px;margin-left: 50px" >
      <el-input v-model="listQuery.search" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
      <el-button v-show="$route.meta.add" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="dialogFormVisible = true">添加用户</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="ID" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" align="center">
        <template slot-scope="scope">
          {{ scope.row.password }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-show="$route.meta.update" type="primary" size="mini" @click="handleUpdate(scope.row.id)">编辑</el-button>
          <el-button v-show="$route.meta.delete" type="primary" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button v-show="$route.meta.select" type="primary" size="mini" @click="handleSee(scope.row.id)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div align="center">
      <pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="fetchData" />
    </div>
    <div>
      <el-dialog :visible.sync="dialogFormVisible" title="编辑用户">
        <el-form :model="form">
          <el-form-item :label-width="formLabelWidth" label="用户姓名">
            <el-input v-model="form.username" :disabled="dis"/>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="用户密码">
            <el-input v-model="form.password" :disabled="dis"/>
          </el-form-item>
        </el-form>
        <div v-show="show" slot="footer" class="dialog-footer">
          <el-button @click="handRemove">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
    </el-dialog></div>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { addUser, eidtUser, deleteUserByid, findUserByid } from '@/api/user'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination, addUser, eidtUser, deleteUserByid, findUserByid },
  data() {
    return {
      dis: false,
      show: true,
      title: 'aa',
      list: null,
      total: null,
      listQuery: {
        page: 1,
        limit: 5,
        search: null
      },

      downloadLoading: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        id: '',
        username: '',
        password: ''
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      })
    },
    handleUpdate(row) {
      eidtUser(row).then(res => {
        this.form.id = res.id
        this.form.username = res.username
        this.form.password = res.password
        this.dialogFormVisible = true
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUserByid(id)
          .then(res => {
            this.$message({
              message: '删除用户成功',
              type: 'success'
            })
            this.fetchData()
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    handleSee(id) {
      findUserByid(id)
        .then(res => {
          this.show = false
          this.dis = true
          this.form.username = res.username
          this.form.password = res.password
          this.dialogFormVisible = true
        })
    },
    handRemove() {
      this.show = true
      this.dis = false
      this.dialogFormVisible = false
    },
    addUser() {
      addUser(this.form.id, this.form.username, this.form.password)
        .then(res => {
          this.dialogFormVisible = false
          this.form.username = ''
          this.form.password = ''
          this.fetchData()
        })
    }
  }
}
</script>
