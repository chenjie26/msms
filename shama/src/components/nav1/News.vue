<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item>
                    <el-select v-model="formInline.roomNumber" @change="serviceChange" placeholder="请选择关键字">
                        <el-option
                          v-for="item in formInline.options"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item><!--
                <el-form-item>
                    <el-input v-model="formInline.keywords" placeholder="关键词"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button v-on:click="search">查询</el-button>
                </el-form-item>>-->
                <el-form-item>
                    <el-button @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <template>
            <el-table :data="tableData" highlight-current-row v-loading="listLoading" style="width: 100%;">
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column prop="name" label="名称" sortable>
                </el-table-column>
                <el-table-column prop="created_at" label="时间" :formatter="formatDate"  sortable>
                </el-table-column>
                <el-table-column inline-template :context="_self" label="操作" width="180">
                    <span>
                        <el-button :id="tableData.id" type="text" size="small" @click="handleEdit(row)">编辑</el-button>
                        <el-button :id="tableData.id" type="text" size="small" @click="handleDel(row)">删除</el-button>
                        <el-button :id="tableData.id" type="text" size="small" @click="handlePublish(row)">发布</el-button>
                    </span>
                </el-table-column>
            </el-table>
        </template>

        <!--分页-->
        <el-col :span="24" class="toolbar" style="padding-bottom:10px;">
            <el-pagination @size-change="handleSizeChange"
 @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, prev, pager, next, jumper"
                :total="total" style="float:right">
            </el-pagination>
        </el-col>


        <el-dialog :title="detailFormTtile" v-model="detailFormVisible" :close-on-click-modal="false">
            <el-table :data="detailData">
                <el-table-column property="member_id" label="用户id" ></el-table-column>
                <el-table-column property="created_at" label="报名时间" :formatter="formatDate"  ></el-table-column>
            </el-table>
        </el-dialog>

        <!--编辑界面-->
        <el-dialog :title="editFormTtile" v-model="editFormVisible" :close-on-click-modal="false" size="large" >
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
			<el-form-item label="推送目标" >
				<el-select v-model="editForm.roomNumber" placeholder="请选择推送类别">
					<el-option
					  v-for="item in formInline.options"
					  :label="item.name"
					  :value="item.id">
					</el-option>
				</el-select>
				OR
				<el-select v-model="editForm.user_id" placeholder="请选择推送用户">
                    <el-option
                      v-for="item in formInline.users"
                      :label="item.username"
                      :value="item.id">
                    </el-option>
                </el-select>
			</el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input placeholder="请输入内容" v-model="editForm.name"></el-input>
                </el-form-item>
				<el-form-item label="内容" prop="content">
					<ckeditor v-model="editForm.content" :id="editorA" :height="'300px'" :toolbar="[['Format']]"></ckeditor>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
            </div>
        </el-dialog>

    </section>
</template>

<script>
    import util from '../../common/util'
    import NProgress from 'nprogress'
    import Ckeditor from '../ckeditor.vue'
  export default {
    components: { Ckeditor },
    data() {
      return {
                ordersDetailUrl:function (obj){
                    return 'http://shama.jcjever.com/member_news?page=1&active_id='+obj.id;
                },
                DetailUrl: (obj) => {
                    if(obj.id){
                        return 'http://shama.jcjever.com/news/'+obj.id;
                    }else{
                        return 'http://shama.jcjever.com/news';
                    }
                },
                PublishUrl: (obj) => {
                    if(obj.id){
                        return 'http://shama.jcjever.com/news/'+obj.id+'/publish';
                    }else{
                        return 'http://shama.jcjever.com/news';
                    }
                },
                ListUrl: function (obj){
                    if(!obj.page)
                        obj.page = 1;
                    if(!obj.keywords)
                        obj.keywords = '';
					if(!obj.roomNumber)
                        obj.roomNumber = '';
                    return 'http://shama.jcjever.com/news?page=' + obj.page + '&keywords=' + obj.keywords + '&roomNumber=' + obj.roomNumber;
                },
                ListNewsTypeUrl: function (obj){
                    if(!obj.page)
                        obj.page = 1;
                    if(!obj.keywords)
                        obj.keywords = '';
                    return 'http://shama.jcjever.com/news_types';
                },
                ListUserUrl: function (obj){
                    if(!obj.page)
                        obj.page = 1;
                    if(!obj.keywords)
                        obj.keywords = '';
                    return 'http://shama.jcjever.com/users';
                },
                formInline: {
                    keywords: '',
                    options:[],
                    roomNumber: ''
                },
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                //value1:'',
                editFormVisible:false,//编辑界面显是否显示
                detailFormVisible:false,//编辑界面显是否显示
                editFormTtile:'编辑',//编辑界面标题
                detailFormTtile:'报名列表',
                editorA: 'editor-a',
                //编辑界面数据
                editForm: {
                    id:0,
					roomNumber:'',
					user_id: 0
                },
                editLoading:false,
                btnEditText:'提 交',
                editFormRules:{

                },
                tableData: [],
                detailData:[],
                total:0,
                listLoading:false
            }
    },
    mounted: function (){
        this.loadData({page:1});
        this.loadServiceData({page:1});
        this.loadUserData({page:1});
    },
    methods: {
            serviceChange(val){
                this.loadData({page:1,roomNumber:val});
            },
            search(){
                this.loadData({keywords:this.formInline.keywords});
            },
            handleChange(val){
                this.editForm._index = val;
                console.log(`当前页: ${val}`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                console.log(`当前页: ${val}`);
                this.loadData({page:this.currentPage,keywords:this.formInline.keywords});
            },
            handleSizeChange(val) {
               console.log(`每页 ${val} 条`);
            },
            requestError:function(response) {
                this.$notify.error({
                  title: '提示',
                  message: response.body.message
                });
            },
            update(obj){
                this.$http.put(this.DetailUrl(obj),obj).then((response) => {
                    console.log('update success');
                }).catch(this.requestError);
            },
            removeData(obj){
                this.$http.delete(this.DetailUrl(obj)).then((response) => {
                    console.log('remove success');
                }).catch(this.requestError);
            },
            insert(obj,callback){
                this.$http.post(this.DetailUrl(obj),obj).then((response) => {
                    console.log('insert success');
                    callback(response);
                }).catch(this.requestError);
            },
            loadServiceData(obj){
                this.formInline.options = [{name: '男', value: 'male'},{name: '女', id: 'female'},{name: '11号楼', id: '11'}, {name: '12号楼', id: '12'}];
            },
            loadUserData(obj){
                this.$http.get(this.ListUserUrl(obj)).then((response) => {
                    this.formInline.users = response.body.data;
                }).catch(this.requestError);
            },
            loadData(obj){
                this.$http.get(this.ListUrl(obj)).then((response) => {
                    this.tableData = response.body.data;
                    this.total = response.body.total;
                }).catch(this.requestError);
            },
            //性别显示转换
            formatDate:function(row,column){
                return row.created_at = row.created_at.substring(0,10);
            },
            formaterStatus:function (row,column){
                switch(row.status){
                    case 0:
                        row._status='在线';
                        break;
                    case 1:
                        row._status='下线';
                        break;
                    case 2:
                        row._status='取消';
                        break;
                }
                return row._status;
            },
            handleDetail:function(row){
                this.detailFormVisible=true;
                this.detailData = this.loadDetail(row.id);
            },
            loadDetail:function(id){
                this.$http.get(this.ordersDetailUrl({id:id})).then((response) => {
                    this.detailData = response.body.data;
                }).catch(this.requestError);
            },
            handlePublish: function(row) {
                this.$http.get(this.PublishUrl({id:row.id})).then((response) => {
                    this.detailData = response.body.data;
                }).catch(this.requestError);
            },
            //删除记录
            handleDel:function(row){
                //console.log(row);
                var _this=this;
                this.$confirm('确认删除该记录吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    _this.listLoading=true;
                    NProgress.start();
                    setTimeout(function(){
                        _this.removeData({id:row.id});
                        for(var i=0;i<_this.tableData.length;i++){
                            if(_this.tableData[i].id==row.id){
                                _this.tableData.splice(i,1);

                                _this.listLoading=false;
                                NProgress.done();
                                _this.$notify({
                                    title: '成功',
                                    messphone: '删除成功',
                                    type: 'success'
                                });

                                break;
                            }
                        }
                    },1000);
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit:function(row){

                this.editFormVisible=true;
                this.editFormTtile='编辑';

                this.editForm.id=row.id;
                this.editForm.name = row.name;
                this.editForm.content = row.content;
				this.editForm.roomNumber = row.roomNumber;
				this.editForm.user_id = row.user_id;
            },
            //编辑 or 新增
            editSubmit:function(){
                var _this=this;
                //console.log(_this.$refs.editForm);
                _this.$refs.editForm.validate((valid)=>{
                    console.log(valid);
                    if(valid){
                        _this.$confirm('确认提交吗？','提示',{}).then(()=>{
                            _this.editLoading=true;
                            NProgress.start();
                            _this.btnEditText='提交中';
                            setTimeout(function(){
                                console.log(_this.editForm.id);
                                if(0 == _this.editForm.id){
                                    _this.insert({
	                                    name:_this.editForm.name,
	                                    content:_this.editForm.content,
										roomNumber:_this.editForm.roomNumber,
										user_id:_this.editForm.user_id
                                    },function(response){
                                        _this.tableData.push({
                                            id:response.body.news.id,
											name:_this.editForm.name,
		                                    content:_this.editForm.content,
											roomNumber:_this.editForm.roomNumber,
											user_id:_this.editForm.user_id,
											created_at:response.body.news.created_at
                                        })
                                    });
                                }else{
                                    _this.update({
                                        id:_this.editForm.id,
										name:_this.editForm.name,
	                                    content:_this.editForm.content,
										roomNumber:_this.editForm.roomNumber,
										user_id:_this.editForm.user_id
                                    });
                                }

                                _this.editLoading=false;
                                NProgress.done();
                                _this.btnEditText='提 交';
                                _this.$notify({
                                    title: '成功',
                                    messphone: '提交成功',
                                    type: 'success'
                                });
                                _this.editFormVisible = false;

                                if(_this.editForm.id==0){
                                    //新增

                                }else{
                                    //编辑
                                    for(var i=0;i<_this.tableData.length;i++){
                                        if(_this.tableData[i].id==_this.editForm.id){
                                            _this.tableData[i].name=_this.editForm.name;
											_this.tableData[i].content=_this.editForm.content;
                                            _this.tableData[i].roomNumber=_this.editForm.roomNumber;
                                            _this.tableData[i].user_id=_this.editForm.user_id;
                                            break;
                                        }
                                    }
                                }
                            },1000);

                        });

                    }
                });

            },
            //显示新增界面
            handleAdd:function(){
                var _this=this;

                this.editFormVisible=true;
                this.editFormTtile='新增';
				_this.editForm.id = 0,

				_this.editForm.name = '',
				_this.editForm.content = '',
				_this.editForm.roomNumber = '',
				_this.editForm.user_id = 0
            }
    }
  }
</script>

<style scoped>
    .toolbar .el-form-item {
        margin-bottom: 10px;
    }

    .toolbar {
        background: #fff;
        padding: 10px 10px 0px 10px;
    }
</style>
