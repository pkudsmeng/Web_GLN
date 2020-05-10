Vue.prototype.$http=axios
var vue = new Vue({
    el: '#app',
    data() {
      return {
        activeIndex: '1-1',

        tableData: [],
        tableLoading: false,
        searchForm: {
          minLon: '121.234',
          maxLon: '135,46',
          minLat: '32.908',
          maxLat: '45.98',
        },

        resultForm: {
          count: null,
          searchingTime: null
        },

        searchGLN: {
          glncode: '121234',

        },

        resultGLN: {
          searchingTime: null
        },

        searchDis: {
          glncode: '121234',
          dis: '1000'
        },

        resultLoading: false
      }
    },
    methods: {
      test: () => {
        alert("这个是按钮的点击事件")
      },

      test2: function(){
        let _this = this;
        _this.resultLoading = true;
        window.setTimeout(function(){
          _this.resultForm.count = parseInt(Math.random() * 100);
          _this.resultForm.searchingTime = Math.random() * 1000;
          _this.resultGLN.searchingTime = Math.random() * 1000;
          _this.resultLoading = false;
        },2000)
      },

      change(e){
       this.$forceUpdate()
      },

      // 加载本地json数据
      loadingData: function(){
        let _this = this
        _this.tableLoading = true
        this.$http.get('./data/data.json')
          .then(function (res) {
            _this.tableData = res.data
          })
          .catch(err => { console.log(err) }
          )
          .finally(res => {
            _this.tableLoading = false
            console.log('数据加载完成')
          })
      },
      initialMap: function() {
        // GL版命名空间为BMapGL
        // 按住鼠标右键，修改倾斜角和角度
        var map = new BMap.Map("bMap");    // 创建Map实例
        map.centerAndZoom(new BMap.Point(115.404, 30.915), 15);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      },

      handleSelect(key, keyPath) {
        this.activeIndex = key
        if(this.activeIndex === '1-1'){
          this.loadingData()
        }
//        this.$message({
//          message: '当前选中菜单：'+ key,
//          type: 'success'
//        });
      },
      closeOneMenu () {
          this.activeIndex = ''
      }
    },
    mounted: function() {
      this.initialMap()
      this.loadingData()
    }
  })
