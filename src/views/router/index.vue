<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom: 20px;margin-left: 50px" >
      <el-input v-model="listQuery.search" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
      <el-button v-show="$route.meta.add" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="dialogFormVisible = true">添加路由</el-button>
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
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="路径" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.path }}</span>
        </template>
      </el-table-column>
      <el-table-column label="父ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.parentid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row.id)">编辑</el-button>
          <el-button type="primary" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button type="primary" size="mini" @click="handleSee(scope.row.id)">查看</el-button>
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
      <el-dialog :visible.sync="dialogFormVisible" :title="dialogTitle">
        <el-form :model="form">
          <el-form-item :label-width="formLabelWidth" label="名称">
            <el-input v-model="form.name" :disabled="dis"/>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="path">
            <el-input v-model="form.path" :disabled="dis"/>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="父ID">
            <el-input v-model="form.parentid" :disabled="dis"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handRemove">取 消</el-button>
          <el-button v-show="show" type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getList, add, delectByid, selectRolesByid } from '@/api/router'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { routerlist } from '@/router/routerlist'
export default {
  name: 'ComplexTable',
  components: { Pagination },
  data() {
    return {
      dialogTitle: '添加角色',
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
        name: '',
        path: '',
        parentid: ''
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
      selectRolesByid(row).then(res => {
        this.form.id = res.id
        this.form.name = res.name
        this.dialogFormVisible = true
      })
    },
    handleDelete(id) {
      console.log(routerlist)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delectByid(id)
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
      selectRolesByid(id)
        .then(res => {
          this.show = false
          this.dis = true
          this.form.name = res.name
          this.dialogFormVisible = true
        })
    },
    handRemove() {
      this.show = true
      this.dis = false
      this.dialogFormVisible = false
    },
    add() {
      add(this.form.id, this.form.name, this.form.path, this.form.parentid)
        .then(res => {
          this.dialogFormVisible = false
          this.form.name = ''
          this.form.id = ''
          this.fetchData()
        })
    }
  }
}
</script>
