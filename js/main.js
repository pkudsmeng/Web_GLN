Vue.prototype.$http=axios
var canvasLayer = null
var vue = new Vue({
    el: '#app',
    data() {
      return {
        activeIndex: '2-2',

        tableData: [],
        tableLoading: false,
        tableLoadingText: '正在加载数据',
        // code这一列是否显示
        codeColShow: false,
        codeCol: 'test',
        newGLNShow: false,


        searchForm: {
          minLon: '107.2341',
          maxLon: '109.4653',
          minLat: '32.9098',
          maxLat: '33.1809',
        },

        resultForm: {
          count: null,
          searchingTime: null
        },

        searchGLN: {
          glncode: 'N47HKO15N15140711123',

        },

        resultGLN: {
          searchingTime: null
        },

        searchDis: {
          glncode: '121234',
          dis: '1000'
        },

        resultLoading: false,

        ifShowBottomTable: false
      }
    },
    methods: {
        initialMap: function() {
        // GL版命名空间为BMapGL
        // 按住鼠标右键，修改倾斜角和角度
        window.map = new BMap.Map("bMap");    // 创建Map实例
        map.centerAndZoom(new BMap.Point(115.404, 30.915), 15);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      },

      test: () => {
        alert("这个是按钮的点击事件")
      },

      radius: function(){
        let _this = this;
        _this.resultLoading = true;
        window.setTimeout(function()
        {
            _this.searchDis.count = parseInt(Math.random() * 80);
            _this.searchDis.searchingTime = Math.random(0.003,0.05) * 1000;
            _this.resultLoading = false;
        },_this.resultForm.searchingTime)

        _this.tableLoading = true
        this.$http.get('./data/radius.json')
          .then(function (res) {
            _this.tableData = res.data
          })
          .catch(err => { console.log(err) }
          )
          .finally(res => {
            _this.tableLoading = false
            console.log('数据加载完成')

          })
          _this.tableLoading = false;
          _this.codeCol = 'code'
          _this.newGLN = 'newGLN'
          _this.tableLoadingText = '正在加载数据'

        var point = new BMap.Point(100.771252,21.957884); // 设置中心点 中心点是四川成都

        var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(22, 25), {

		    offset: new BMap.Size(10, 25),
		    imageOffset: new BMap.Size(0, 0 - 10 * 30)

			});

		map.centerAndZoom(point, 13);



        var marker = new BMap.Marker(point,{icon: myIcon});// 创建标注
        map.addOverlay(marker);
        marker.enableDragging(); //marker可拖拽

        var circle = new BMap.Circle(point,3000,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});//设置覆盖物的参数，中心坐标，半径，颜色
        map.addOverlay(circle);//在地图上显示圆形覆盖物
        console.log(marker)

      },

    closeOneBottomTable:function(){
            this.ifShowBottomTable = false;
    },

      test2: function(){
        let _this = this;
        _this.ifShowBottomTable = true;
        _this.resultLoading = true;
        window.setTimeout(function()
        {
            _this.resultForm.count = parseInt(Math.random() * 80);
            _this.resultForm.searchingTime = Math.random(0.003,0.05) * 1000;
            _this.resultLoading = false;
        },_this.resultForm.searchingTime)


        //绘制矩形
        map.centerAndZoom(new BMap.Point(_this.searchForm.minLon,_this.searchForm.minLat), 12);
        if(canvasLayer != null){
            map.removeOverlay(canvasLayer)
        }
        canvasLayer = new BMap.CanvasLayer({
            update: update
        });

        function update() {
            var ctx = this.canvas.getContext("2d");

            if (!ctx) {
                return;
            }

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            var temp = {};
            ctx.fillStyle = "rgba(50, 106, 255, 0.1)";

            ctx.beginPath();
            var data = [
            new BMap.Point(_this.searchForm.minLon,_this.searchForm.minLat),
            ];

            for (var i = 0, len = data.length; i < len; i++) {

                // 绘制时需要对经纬度进行转换
                var pixel = map.pointToPixel(data[i]);

                ctx.fillRect(pixel.x, pixel.y, 300, 250);
            }
    }

        map.addOverlay(canvasLayer);


        _this.tableLoading = true
        this.$http.get('./data/range.json')
          .then(function (res) {
            _this.tableData = res.data
          })
          .catch(err => { console.log(err) }
          )
          .finally(res => {
            _this.tableLoading = false
            console.log('数据加载完成')

          })
          _this.tableLoading = false;
          _this.codeCol = 'code'
          _this.newGLN = 'newGLN'
          _this.tableLoadingText = '正在加载数据'


      },

      shuxing: function(){
        let _this = this;
        _this.resultLoading = true;
        window.setTimeout(function(){
//          _this.resultForm.count = parseInt(Math.random() * 100);
//          _this.resultForm.searchingTime = Math.random() * 1000;
          _this.resultGLN.searchingTime = Math.random() * 10;
          _this.resultLoading = false;
        },20)


        map.clearOverlays();//清空原来的标注

        point = new BMap.Point(106.522026,29.598951);

        map.centerAndZoom(point, 15);

        var marker = new BMap.Marker(point);  // 创建标注，为要查询的地方对应的经纬度
        map.addOverlay(marker);

        var content = "<br/>GLN码：6907766901884"+"<br/>位置类型：加工厂"
                        + "<br/>参与方名称：千集汇绿色食品加工厂"
                        + "<br/>邮政地址：重庆市渝北区龙华大道99号"
                        + "<br/>注册时间：2017-04-10"+"<br/>联系人: (023)67183520"
                        + "<br/>经度：" + point.lng + "<br/>纬度：" + point.lat;

        var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>");

        map.addOverlay(infoWindow);
        marker.addEventListener("click", function () {
         this.openInfoWindow(infoWindow);
         });

      },
      guijiGet(){
        var PointArr = [
            {lat: 36.10339957700999, lng: 120.4207801005104},
            {lat: 36.10349055332635,lng: 120.42113539348455},
            {lat: 36.10370795896673,lng: 120.42162977768736},
            {lat: 36.10411490190429,lng: 120.42166901055167},
            {lat: 36.104232027406695,lng: 120.42185015059275},
            {lat: 36.10425620255758,lng: 120.42202022562539},
            {lat: 36.104265908631284,lng: 120.42208225102176},
            {lat: 36.104399968669526,lng: 120.42187425183421},
            {lat: 36.10452708476511,lng: 120.42076268466177},
            {lat: 36.10480132817409, lng: 120.4196557913201},
            {lat: 36.10560773716036,lng: 120.418951386886},
            {lat: 36.10621159088823,lng: 120.41900182905378},
            {lat: 36.1064641068988,lng: 120.41992809616544},
            {lat: 36.10679444086644,lng: 120.42102125032955},
            {lat: 36.107010189089046,lng: 120.42182982905027},
            {lat: 36.107014665948654,lng: 120.42193587265254},
            {lng: 120.42201589513277, lat: 36.10700627324672},
            {lng: 120.42201589513277, lat: 36.10700627324672},
            {lng: 120.42236704579075, lat: 36.10708566579729},
            {lng: 120.42269817692573, lat: 36.107201270041955},
            {lng: 120.42239277578172, lat: 36.10812797579566},
            {lng: 120.42175457671763, lat: 36.10947659586882},
            {lng: 120.42144906678747, lat: 36.11028554037044},
            {lng: 120.4213722360578, lat: 36.110547069787465},
            {lng: 120.4213722360578, lat: 36.110547069787465},
            {lng: 120.4213722360578, lat: 36.110547069787465},
            {lng: 120.4213722360578, lat: 36.110547069787465},
            {lng: 120.4213722360578, lat: 36.110547069787465},
            {lng: 120.4213722360578, lat: 36.110547069787465},
            {lng: 120.4213722360578, lat: 36.110547069787465},
            {lng: 120.4213722360578, lat: 36.110547069787465},
            {lng: 120.4213722360578, lat: 36.110547069787465},
            {lng: 120.42134433787885, lat: 36.110691285540966},
            {lng: 120.42234193234574, lat: 36.110931417305515},
            {lng: 120.42374305054953, lat: 36.11109804633305},
            {lng: 120.42478859440246, lat: 36.111102173671576},
            {lng: 120.42606467439863, lat: 36.11129314178323},
            {lng: 120.4274220550685, lat: 36.11148065963647},
            {lng: 120.42831965719076, lat: 36.111638311669736},
            {lng: 120.42839951065358, lat: 36.11164240198062},
            {lng: 120.42839951065358, lat: 36.11164240198062},
            {lng: 120.42839951065358, lat: 36.11164240198062},
            {lng: 120.42839951065358, lat: 36.11164240198062},
            {lng: 120.42839951065358, lat: 36.11164240198062},
            {lng: 120.42839951065358, lat: 36.11164240198062},
            {lng: 120.42839951065358, lat: 36.11164240198062},
            {lng: 120.42839951065358, lat: 36.11164240198062},
            {lng: 120.42869196887202, lat: 36.1116737914188},
            {lng: 120.43031048017785, lat: 36.11190642360766},
            {lng: 120.43239173942534, lat: 36.11229570404404},
            {lng: 120.43368467575368, lat: 36.11281195352835},
            {lng: 120.43371757862009, lat: 36.11284016439977},
            {lng: 120.43379230066179, lat: 36.11284161798212},
            {lng: 120.43441423254144, lat: 36.113205746094536},
            {lng: 120.43549342023326, lat: 36.11391074053337},
            {lng: 120.43637497341942, lat: 36.11441797319607},
            {lng: 120.4365024200745, lat: 36.11445405475196},
            {lng: 120.43670459776231, lat: 36.11458083085174},
            {lng: 120.43745246924915, lat: 36.11507070008782},
            {lng: 120.43821097991501, lat: 36.115416050767585},
            {lng: 120.43821097991501, lat: 36.115416050767585},
            {lng: 120.43821097991501, lat: 36.115416050767585},
            {lng: 120.43821097991501, lat: 36.115416050767585},
            {lng: 120.43821097991501, lat: 36.115416050767585},
            {lng: 120.43823585473245, lat: 36.11541929557907},
            {lng: 120.43823585473245, lat: 36.11541929557907},
            {lng: 120.43823585473245, lat: 36.11541929557907},
            {lng: 120.43823585473245, lat: 36.11541929557907},
            {lng: 120.43823585473245, lat: 36.11541929557907},
            {lng: 120.43823585473245, lat: 36.11541929557907},
            {lng: 120.43823585473245, lat: 36.11541929557907},
            {lng: 120.43859812511984, lat: 36.115583971494395},
            {lng: 120.43901701857004, lat: 36.115714318017346},
            {lng: 120.43928467292172, lat: 36.11582517772885},
            {lng: 120.43959708522435, lat: 36.115963587312805},
            {lng: 120.43986466921422, lat: 36.116047547858166},
            {lng: 120.44007952157578, lat: 36.11611896447754},
            {lng: 120.440167025596, lat: 36.11612294605039},
            {lng: 120.440167025596, lat: 36.11612294605039},
            {lng: 120.44024360205321, lat: 36.116138815526504},
            {lng: 120.44024360205321, lat: 36.116138815526504},
            {lng: 120.44024360205321, lat: 36.116138815526504},
            {lng: 120.44026150723737, lat: 36.11614702160796},
            {lng: 120.44027344364953, lat: 36.11615215895656},
            {lng: 120.44027344364953, lat: 36.11615215895656},
            {lng: 120.44028836484941, lat: 36.1161593311561},
            {lng: 120.44034209724579, lat: 36.116201960713745},
            {lng: 120.44048233691922, lat: 36.116254585044935},
            {lng: 120.44048233691922, lat: 36.116254585044935},
            {lng: 120.4405738257871, lat: 36.116276646228826},
            {lng: 120.44073595695149, lat: 36.11635856195875},
            {lng: 120.44115463412841, lat: 36.11652357056175},
            {lng: 120.44118546544034, lat: 36.11653994619434},
            {lng: 120.44118546544034, lat: 36.11653994619434},
            {lng: 120.44121529948468, lat: 36.1165533090833}];
        map.centerAndZoom(PointArr, 13);// 根据经纬度显示地图的范围
        map.setViewport(PointArr);// 根据提供的地理区域或坐标设置地图视野

        addStartMarker(new BMap.Point(PointArr[0].lng, PointArr[0].lat),'起点',map);

        var carMk;//先将终点坐标展示的mark对象定义

        //小车行驶图标
        var drivingPoint = new BMap.Icon('http://developer.baidu.com/map/jsdemo/img/car.png', new BMap.Size(50,20), {
            anchor : new BMap.Size(50, 20),
            imageSize:new BMap.Size(50,20)
        });

        //加工厂图标
        var jgPoint = new BMap.Icon('/CODE/web/Web_GLN/data/jg.png', new BMap.Size(50,50), {
            anchor : new BMap.Size(50, 50),
            imageSize:new BMap.Size(40,50)
        });

        //终点图标
        var terminalPoint = new BMap.Icon('/CODE/web/Web_GLN/data/xs.png', new BMap.Size(50,50), {
            anchor : new BMap.Size(50, 50),
            imageSize:new BMap.Size(40,50)
        });

        var i = 0;
        var interval = setInterval(function () {
            if (i >= PointArr.length) {
                clearInterval(interval);
                return;
            }
            drowLine(map,PointArr[i],PointArr[i+1]);//画线调用
            i = i + 1;
        }, 30);

        // 划线
        function drowLine(map,PointArr,PointArrNext) {
            if(PointArrNext!=undefined) {
                var polyline = new BMap.Polyline(
                    [
                        new BMap.Point(PointArr.lng, PointArr.lat),
                        new BMap.Point(PointArrNext.lng, PointArrNext.lat)
                    ],
                    {
                        strokeColor: "red",
                        strokeWeight: 7,
                        strokeOpacity: 1
                    });   //创建折线
                map.addOverlay(polyline);
                addMarkerEnd(new BMap.Point(PointArrNext.lng, PointArrNext.lat), '小车行驶', map, PointArrNext, new BMap.Point(PointArr.lng, PointArr.lat));//添加图标
            }else {
                addMarkerEnd(new BMap.Point(PointArr.lng, PointArr.lat), '终点', map);//添加终点图标
            }
        }
        //添加起始图标
        function addStartMarker(point, name,mapInit) {
            if(name=="起点"){
                var myIcon = new BMap.Icon("/CODE/web/Web_GLN/data/cd.png", new BMap.Size(50,50),{
                    anchor: new BMap.Size(50, 50),//这句表示图片相对于所加的点的位置mapStart
                    imageSize:new BMap.Size(40, 50)//图标所用的图片的大小，此功能的作用等同于CSS中的background-size属性。可用于实现高清屏的高清效果
                    // offset: new BMap.Size(-10, 45), // 指定定位位置
                    // imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移
                });
                window.marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
                mapInit.addOverlay(marker);               // 将标注添加到地图中
                marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            }
        }
        //添加行驶和终点图标
        function addMarkerEnd(point, name,mapInit,trackUnit,prePoint) {
            if(name=="小车行驶"){
                if(carMk){//先判断第一次进来的时候这个值有没有定义，有的话就清除掉上一次的。然后在进行画图标。第一次进来时候没有定义也就不走这块，直接进行画图标
                    mapInit.removeOverlay(carMk);
                }
                carMk = new BMap.Marker(point,{icon:drivingPoint});  // 创建标注
                carMk.setRotation(trackUnit.route);//trackUnit.route
                //getAngle(point,prePoint);// js求解两点之间的角度
                carMk.setRotation(getAngle(point,prePoint)-90);// 旋转的角度
                mapInit.addOverlay(carMk);               // 将标注添加到地图中
                if(point.lng=='120.42236704579075'){
                    marker = new BMap.Marker(point,{icon:jgPoint});  // 创建标注
                    mapInit.addOverlay(marker);
                    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

                }
//                carMk.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            }else {
                mapInit.removeOverlay(carMk);
                marker = new BMap.Marker(point,{icon:terminalPoint});  // 创建标注
                mapInit.addOverlay(marker);
                marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            }
        }
        //获得角度的函数
        function getAngle(n,next){
            var ret
            var w1 = n.lat/180 * Math.PI
            var j1 = n.lng/180 * Math.PI

            var w2 = next.lat/180 * Math.PI
            var j2 = next.lng/180 * Math.PI

            ret = 4 * Math.pow(Math.sin((w1 - w2) / 2), 2) - Math.pow(Math.sin((j1 - j2) / 2) * (Math.cos(w1) - Math.cos(w2)), 2);
            ret = Math.sqrt(ret);

            // var temp = Math.sin(Math.abs(j1 - j2) / 2) * (Math.cos(w1) + Math.cos(w2));
            var temp = Math.sin((j1 - j2) / 2) * (Math.cos(w1) + Math.cos(w2));
//            console.log(temp)
            ret = ret/temp;

            ret = Math.atan(ret) / Math.PI * 180 ;
            ret += 90;

            // 这里用如此臃肿的if..else是为了判定追踪单个点的具体情况,从而调整ret的值
            if(j1-j2 < 0){
                // console.log('j1<j2')
                if(w1-w2 < 0){
                    // console.log('w1<w2')
                    ret;
                }else{
                    // console.log('w1>w2')
                    ret = -ret+180;
                }
            }else{
                // console.log('j1>j2')
                if(w1-w2 < 0){
                    // console.log('w1<w2')
                    ret = 180+ret;
                }else{
                    // console.log('w1>w2')
                    ret = -ret;
                }
            }
            return ret ;
        }

      },

      createCode: function(){
        let _this = this;
        _this.tableLoading = true;
        _this.tableLoadingText = '正在生成GLN位置扩展编码'
        window.setTimeout(function(){
          _this.tableLoading = false;
          _this.codeCol = 'code'
          _this.newGLN = 'newGLN'
          _this.tableLoadingText = '正在加载数据'

          _this.$alert('编码生成用时：3027.26ms', '编码生成', {
              confirmButtonText: '确定',
//              callback: action => {
//                this.$message({
//                  type: 'info',
//                });
//              }
            });
        },800)





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
    }
  })
