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
				</el-form-item>
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
				<el-table-column prop="_index" label="index" sortable>
				</el-table-column>
				<el-table-column prop="created_at" label="时间" :formatter="formatDate"  sortable>
				</el-table-column>
				<el-table-column inline-template :context="_self" label="操作" width="180">
					<span>
						<el-button :id="tableData.id" type="text" size="small" @click="handleEdit(row)">编辑</el-button>
						<el-button :id="tableData.id" type="text" size="small" @click="handleDel(row)">删除</el-button>
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
				<el-form-item label="标题" prop="name">
					<el-input placeholder="请输入内容" v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item label="副标题" prop="en_name">
					<el-input placeholder="请输入内容" v-model="editForm.en_name"></el-input>
				</el-form-item>
				<el-form-item label="排序" prop="_index" >
					<el-input  v-model="editForm._index" ></el-input>
				</el-form-item>
				<el-form-item label="链接" prop="link" >
					<el-input  v-model="editForm.link" ></el-input>
				</el-form-item>
				<el-form-item label="缩略图" prop="pic">
					<el-input placeholder="请输入内容" v-model="editForm.pic"></el-input>
				</el-form-item>
				<el-form-item label="亮点" prop="light_point">
					<el-input type="textarea" v-model="editForm.light_point"></el-input>
				</el-form-item>
				<el-form-item label="浴室" prop="bathroom">
					<el-input type="textarea" v-model="editForm.bathroom"></el-input>
				</el-form-item>
				<el-form-item label="浴缸" prop="bathtub">
					<el-input type="textarea" v-model="editForm.bathtub"></el-input>
				</el-form-item>
				<el-form-item label="床型" prop="bed">
					<el-input type="textarea" v-model="editForm.bed"></el-input>
				</el-form-item>

				<el-form-item label="内容" prop="pics">
					<ckeditor v-model="editForm.pics" :id="editorA" :height="'300px'" :toolbar="[['Format']]"></ckeditor>
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
      				return 'http://shama.jcjever.com/member_houses?page=1&active_id='+obj.id;
      			},
				DetailUril: (obj) => {
					if(obj.id){
						return 'http://shama.jcjever.com/houses/'+obj.id;
					}else{
						return 'http://shama.jcjever.com/houses';
					}
				},
	  			ListUrl: function (obj){
	  				if(!obj.page)
	  					obj.page = 1;
	  				if(!obj.keywords)
	  					obj.keywords = '';
	  				return 'http://shama.jcjever.com/houses?page=' + obj.page + '&keywords=' + obj.keywords;

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
				detailFormTtile:'报名列表',
				editorA: 'editor-a',
				//编辑界面数据
				editForm: {
					id:0,
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
    			//if(this.formInline.keywords){
    			this.loadData({keywords:this.formInline.keywords});
    			//}
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
				this.$http.put(this.DetailUril(obj),obj).then((response) => {
					console.log('update success');
				}).catch(this.requestError);
			},
			removeData(obj){
				this.$http.delete(this.DetailUril(obj)).then((response) => {
					console.log('remove success');
				}).catch(this.requestError);
			},
			insert(obj,callback){
				this.$http.post(this.DetailUril(obj),obj).then((response) => {
					console.log('insert success');
					callback(response);
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
			formatText:function(row,column){
				row._message = row.message;
				if(row.message&&row.message.length>10){
					row._message = row.message.substring(0,10)+"...";
				}
				return row._message;
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
				this.editForm.en_name = row.en_name;
				this.editForm.name = row.name;
				this.editForm.light_point = row.light_point;
				this.editForm.bathroom = row.bathroom;
				this.editForm.bathtub = row.bathtub;
				this.editForm.bed = row.bed;
				this.editForm._index = row._index;
				this.editForm.pic = row.pic;
				this.editForm.pics = row.pics;
				this.editForm.link = row.link;

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
										//id:new Date().getTime(),
										name:_this.editForm.name,
										pic:_this.editForm.pic,
										en_name:_this.editForm.en_name,
										light_point:_this.editForm.light_point,
										bathroom:_this.editForm.bathroom,
										bathtub:_this.editForm.bathtub,
										bed:_this.editForm.bed,
										_index:_this.editForm._index,
										pics:_this.editForm.pics,
										link:_this.editForm.link
									},function(response){
										_this.tableData.push({
											id:response.body.house.id,
											name:_this.editForm.name,
											pic:_this.editForm.pic,
											en_name:_this.editForm.en_name,
											light_point:_this.editForm.light_point,
											bathroom:_this.editForm.bathroom,
											bathtub:_this.editForm.bathtub,
											bed:_this.editForm.bed,
											_index:_this.editForm._index,
											pics:_this.editForm.pics,
											update_at:response.body.house.update_at,
											link:_this.editForm.link
										})
									});
								}else{
									_this.update({
										id:_this.editForm.id,
										name:_this.editForm.name,
										en_name:_this.editForm.en_name,
										light_point:_this.editForm.light_point,
										bathroom:_this.editForm.bathroom,
										bathtub:_this.editForm.bathtub,
										bed:_this.editForm.bed,
										_index:_this.editForm._index,
										pics:_this.editForm.pics,
										link:_this.editForm.link
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

				this.editForm.id=row.id;
				this.editForm.en_name = '';
				this.editForm.name = '';
				this.editForm.light_point = '';
				this.editForm.bathroom = '';
				this.editForm.bathtub = '';
				this.editForm.bed = '';
				this.editForm._index = 100;
				this.editForm.pic = '';
				this.editForm.pics = '';
				this.editForm.link = '';
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
