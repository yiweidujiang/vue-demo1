<template>
  <div>
    <div class="lift-nav">
        <ul class="lift">
            <li>1楼</li>
            <li>2楼</li>
            <li>3楼</li>
            <li>4楼</li>
            <li>5楼</li>
            <li>6楼</li>
        </ul>
    </div>

    <div class="lift-target">
        <div class="t1">这是1楼</div>
        <div class="t2">这是2楼</div>
        <div class="t3">这是3楼</div>
        <div class="t4">这是4楼</div>
        <div class="t5">这是5楼</div>
        <div class="t6">这是6楼</div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'test',
  data() {
    return {
        array: [],
        json:{
            "control1": ".lift-nav",    //侧栏电梯的容器
            "control2": ".lift",         //需要遍历的电梯的父元素
            "target": [".t1",".t2",".t3",".t4",".t5",".t6"],    //监听的内容，注意一定要从小到大输入
            "current": "current"         //选中的样式
        }
    }
  },
  mounted () {
      this.LiftEffect(this.json)
  },
  methods: {
    
    LiftEffect(json){

        var array=[];
        
        for(var i =0; i<json.target.length;i++){
            var t = $(json.target[i]).offset().top;
            array.push(t);
        
        }
        
        function Selected(index){
            $(json.control2).children().eq(index).addClass(json.current).siblings().removeClass(json.current);
        }
        
        
        $(window).on("scroll",Check);
        
        function Check(){
        
            var wst = $(window).scrollTop();
        
            // 电梯淡入淡出效果
            // if(wst >= $(json.target[0]).offset().top-100){
            //     $(json.control1).fadeIn(500);
            // }else{
            //     $(json.control1).fadeOut(500);
            // }
        
            var key =0;
            var flag = true;
            for(var i =0; i<array.length; i++){
                key++;
                if(flag){
        
                    if(wst >= array[array.length-key]-300){
                        var index = array.length-key;
                        flag = false;
                    }else{
                        flag=true;
                    }
        
                }
            }
            Selected(index);
        }
        
        $(json.control2).children().on("click",function(){
        
                $(window).off("scroll");
                var index = $(this).index();
                Selected(index);
        
        
                var flag = true;
                for(var i =0; i<array.length; i++){
        
                    if(flag){
        
                        if(index == i){
                            $("html,body").stop().animate({
                                "scrollTop": array[i]-50
                            },500,function(){
                                $(window).on("scroll",Check);
                            });
                            flag = false;
                        }else{
                            flag=true;
                        }
        
                    }
                }
        
        });
    }
  }
}
 
</script>

<style scoped>
       *{
            margin: 0;
            padding: 0;
        }
        body{
            height: 6000px;
        }
        .lift-nav{
            position: fixed;
            top: 100px;
            left: 30px;
            /* display: none; */
        }
        .lift-nav li{
            width: 60px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            color: #fff;
            padding: 10px 10px;
            margin-bottom: 10px;
            background: skyblue;
            cursor: pointer;
        }

        .lift-nav li.current{
            background: tomato;
        }

        .t1,.t2,.t3,.t4,.t5,.t6{
            width: 800px;
            height: 400px;
            text-align: center;
            line-height: 400px;
            background: skyblue;
            margin: 100px auto;
            font-size: 30px;
            color: #fff;
        }
        .t1{
            margin-top: 200px;
        }
        .t2{
            background: pink;
        }
        .t3{
            background: tomato;
        }
        .t4{
            background: grey;
        }
        .t5{
            background: yellow;
        }
        .t6{
            background: seagreen;
        }
</style>
