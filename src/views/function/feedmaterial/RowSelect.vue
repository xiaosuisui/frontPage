<template>
  <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" />
</template>
<script>
const columns = [{
  title: '原材料名称',
  dataIndex: 'rawmaterialName',
}, {
  title: '原材料编号',
  dataIndex: 'rawmaterialNo',
}, {
  title: '用户名',
  dataIndex: 'userName',
}];

const data = [];



export default {
  name:'RowSelect',
  props: {
    currentWarehouseDetail:'',
  },
  data() {
    return {
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
    }
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: false,
        onSelection: this.onSelection,
      }
    }
  },
  watch: {
      currentWarehouseDetail(val) {
        this.getData()
      }
   },
  mounted () {
    this.getData()
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      if(selectedRowKeys.length>0){
      	var ele=selectedRowKeys[selectedRowKeys.length-1]
      	this.selectedRowKeys=[]
        this.selectedRowKeys.push(ele)
        this.$emit('send',[ele])
      }else{
      	this.selectedRowKeys=[]
      	this.$emit('send',['0000'])
      }
    },
    getData(){
      const params={id:this.currentWarehouseDetail}
      this.$get('rawmaterial/getData', {
        ...params
      }).then((r) => {
         this.data = r.data['data']
         this.selectedRowKeys=r.data['checked']
      })
    }
  }
}
</script>
<style>

.ant-checkbox-indeterminate {
	display:none !important
}
.ant-table-selection{
	display:none !important
}
</style>