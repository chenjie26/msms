<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item>
					<el-input v-model="formInline.keywords" placeholder="关键词"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button v-on:click="search">查询</el-button>
				</el-form-item><!--
				<el-form-item>
					<el-button @click="handleAdd">新增</el-button>
				</el-form-item>-->
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="tableData" highlight-current-row v-loading="listLoading" style="width: 100%;">
				<el-table-column type="index" width="50">
				</el-table-column>
				<el-table-column prop="name" label="名称" width="100" sortable>
				</el-table-column>
				<el-table-column prop="m_name" label="用户" width="100" sortable>
				</el-table-column>
				<el-table-column prop="_status" label="状态" :formatter="formaterStatus" width="100" sortable>
				</el-table-column>
				<el-table-column prop="price" label="价格" width="100" sortable>
				</el-table-column>
				<el-table-column prop="created_at" label="时间"  sortable>
				</el-table-column>
				<el-table-column prop="uuid" label="单号"  sortable>
				</el-table-column>
				<el-table-column inline-template :context="_self" label="操作" width="100">
					<span>
						<el-button type="text" size="small" @click="handleDetail(row)">详情</el-button>
						<el-button :id="tableData.id" type="text" size="small" @click="handleEdit(row)">编辑</el-button>
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
			    <el-table-column property="order_id" label="订单id" width="100"></el-table-column>
			    <el-table-column property="service_detail_id" label="服务id" width="100"></el-table-column>
			    <el-table-column property="price" label="单价" width="100"></el-table-column>
				<el-table-column property="content" label="描述" width="100"></el-table-column>
			    <el-table-column property="created_at" label="创建时间" :formatter="formatDate"  ></el-table-column>
			</el-table>
		</el-dialog>

		<!--编辑界面-->
		<el-dialog :title="editFormTtile" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="审核" prop="status">
					<el-radio-group v-model="editForm.status">
					    <el-radio :label="0">未处理</el-radio>
					    <el-radio :label="1">通过</el-radio>
					    <el-radio :label="2">忽略</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="备注" prop="message">
					<el-input type="textarea" v-model="editForm.message"></el-input>
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

  export default {
    data() {
      return {
      			ordersDetailUrl:function (obj){
      				return 'http://shama.jcjever.com/order_detail?page=1&order_id='+obj.id;
      			},
				DetailUril: (obj) => {
					return 'http://shama.jcjever.com/orders/'+obj.id;
				},
	  			ListUrl: function (obj){
	  				if(!obj.page)
	  					obj.page = 1;
	  				if(!obj.keywords)
	  					obj.keywords = '';
	  				return 'http://shama.jcjever.com/orders?page=' + obj.page + '&keywords=' + obj.keywords;

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
				detailFormVisible:false,//编辑界面显是否显示
				editFormTtile:'编辑',//编辑界面标题
				detailFormTtile:'详情',
				//编辑界面数据
				editForm: {
					id:0,
					status: 0,
					message: ''
				},
				editLoading:false,
				btnEditText:'提 交',
				editFormRules:{
					message:[
						{ required: true, message: '请输入备注', trigger: 'blur' }
					]
				},
				tableData: [],
				detailData:[],
				total:0,
				listLoading:false
     		}
    },
	mounted: function (){
		this.loadData({page:1});
	},
    methods: {
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
			update(obj){
				this.$http.put(this.DetailUril(obj),{status:obj.status,message:obj.message}).then((response) => {
					console.log('update success');
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
						row._status='未处理';
						break;
					case 1:
						row._status='已通过';
						break;
					case 2:
						row._status='已忽略';
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
				console.log(row.status);
				this.editFormVisible=true;
				this.editFormTtile='编辑';
				this.editForm.id=row.id;
				this.editForm.status= row.status;
				this.editForm.message=row.message;
				this.editForm.name=row.name;
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
								_this.update({id:_this.editForm.id,status:_this.editForm.status,message:_this.editForm.message});
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
										name: _this.editForm.name
									});
								}else{
									//编辑
									for(var i=0;i<_this.tableData.length;i++){
										if(_this.tableData[i].id==_this.editForm.id){
											_this.tableData[i].status=_this.editForm.status;
											_this.tableData[i].message=_this.editForm.message;
											console.log(_this.editForm.status);
											console.log(_this.editForm.message);
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
