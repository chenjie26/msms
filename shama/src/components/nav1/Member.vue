<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item>
					<el-input v-model="formInline.keywords" placeholder="关键词"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button v-on:click="search" >查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button v-on:click="_export" >导出</el-button>
				</el-form-item>
				<!--
				<el-form-item>
					<el-button @click="handleAdd">新增</el-button>
				</el-form-item>
				-->
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="tableData" highlight-current-row v-loading="listLoading" style="width: 100%;">
				<el-table-column type="index" width="50">
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="100" sortable>
				</el-table-column>
				<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
				</el-table-column>
				<el-table-column prop="username" label="电话" width="130" sortable>
				</el-table-column>
				<el-table-column prop="birthDay" label="生日" width="120" :formatter="formatBirth"  sortable>
				</el-table-column>
				<el-table-column prop="email" label="邮箱" sortable>
				</el-table-column>
				<el-table-column inline-template :context="_self" label="操作" width="100">
					<span>
						<!--<el-button type="text" size="small" @click="handleEdit(row)"></el-button>-->
						<el-button type="text" size="small" @click="handleDel(row)">删除</el-button>
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

		<!--编辑界面-->
		<el-dialog :title="editFormTtile" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<!--<el-select v-model="editForm.sex" placeholder="请选择性别">
						<el-option label="男" :value="1"></el-option>
						<el-option label="女" :value="0"></el-option>
					</el-select>-->
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="female">男</el-radio>
						<el-radio class="radio" :label="male">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="电话">
					<el-input-number v-model="editForm.username" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birthDay"></el-date-picker>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input type="textarea" v-model="editForm.email"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取 消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/util'
	import NProgress from 'nprogress'

  export default {
    data() {
      return {
	  			memberListUrl: function (obj){
	  				if(!obj.page)
	  					obj.page = 1;
	  				if(!obj.keywords)
	  					obj.keywords = '';
	  				
					return 'http://shama.jcjever.com/users?page=' + obj.page + '&keywords=' + obj.keywords;
				},
				memberRemoveUrl: function (obj){
					return 'http://shama.jcjever.com/users/' + obj.id;
				},
				formInline: {
					keywords: ''
				},
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				value1:'',
				editFormVisible:false,//编辑界面显是否显示
				editFormTtile:'编辑',//编辑界面标题
				//编辑界面数据
				editForm: {
					id:0,
					name: '',
					sex: 'male',
					username: '',
					birthDay: '',
					email: ''
				},
				editLoading:false,
				btnEditText:'提 交',
				editFormRules:{
					name:[
						{ required: true, messphone: '请输入姓名', trigger: 'blur' }
					]
				},
				tableData: [],
				total:0,
				listLoading:false
     		}
    },
	mounted: function (){
		this.loadData({pphone:1});
	},
    methods: {
    		_export(){
    			alert('daochu');
    		},
    		search(){
    			if(this.formInline.keywords){
    				this.loadData({keywords:this.formInline.keywords});
    			}
    		},
			handleCurrentChange(val) {
				this.currentPage = val;
				console.log(`当前页: ${val}`);
				this.loadData({pphone:val});
			},
			handleSizeChange(val) {
			   console.log(`每页 ${val} 条`);
			},
			requestError:function(response) {
				this.$notify.error({
				  title: '提示',
				  messphone: ''
				});
			},
			removeData(obj){
				this.$http.delete(this.memberRemoveUrl(obj)).then((response) => {
					console.log('remove success');
				}).catch(this.requestError);
			},
			loadData(obj){
				this.$http.get(this.memberListUrl(obj)).then((response) => {
				 	this.tableData = response.body.data;
					this.total = response.body.total;
				}).catch(this.requestError);
			},
			//性别显示转换
			formatSex:function(row,column){
				return row.sex=='male'?'男':row.sex=='female'?'女':'未知';
			},
			formatBirth:function(row,column){
				return row.birthDay==null? '': row.birthDay.substring(0,10);;
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
				this.editForm.name=row.name;
				this.editForm.sex=row.sex;
				this.editForm.username=row.username;
				this.editForm.birthDay=row.birthDay;
				this.editForm.email=row.email;
			},
			//编辑 or 新增
			editSubmit:function(){
				var _this=this;

				_this.$refs.editForm.validate((valid)=>{
					if(valid){

						_this.$confirm('确认提交吗？','提示',{}).then(()=>{
							_this.editLoading=true;
							NProgress.start();
							_this.btnEditText='提交中';
							setTimeout(function(){
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
									_this.tableData.push({
										id:new Date().getTime(),
										name: _this.editForm.name,
										sex: _this.editForm.sex,
										username: _this.editForm.username,
										birthDay: _this.editForm.birthDay==''?'':util.formatDate.format(new Date(_this.editForm.birthDay),'yyyy-MM-dd'),
										email: _this.editForm.email
									});
								}else{
									//编辑
									for(var i=0;i<_this.tableData.length;i++){
										if(_this.tableData[i].id==_this.editForm.id){
											_this.tableData[i].name=_this.editForm.name;
											_this.tableData[i].sex=_this.editForm.sex;
											_this.tableData[i].username=_this.editForm.username;
											_this.tableData[i].birthDay=_this.editForm.birthDay==''?'':util.formatDate.format(new Date(_this.editForm.birthDay),'yyyy-MM-dd');
											_this.tableData[i].email=_this.editForm.email;
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

				this.editForm.id=0;
				this.editForm.name='';
				this.editForm.sex='male';
				this.editForm.username='';
				this.editForm.birthDay='';
				this.editForm.email='';
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
