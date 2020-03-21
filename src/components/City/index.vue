<template>
    <div class="city_body">
        <!-- <div class="city_list">
            <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li>上海</li>
                    <li>北京</li>
                    <li>上海</li>
                    <li>北京</li>
                    <li>上海</li>
                    <li>北京</li>
                    <li>上海</li>
                    <li>北京</li>
                </ul>
            </div>
            <div class="city_sort">
                <div>
                    <h2>A</h2>
                    <ul>
                        <li>阿拉善盟</li>
                        <li>鞍山</li>
                        <li>安庆</li>
                        <li>安阳</li>
                    </ul>
                </div>
                <div>
                    <h2>B</h2>
                    <ul>
                        <li>北京</li>
                        <li>保定</li>
                        <li>蚌埠</li>
                        <li>包头</li>
                    </ul>
                </div>
                <div>
                    <h2>A</h2>
                    <ul>
                        <li>阿拉善盟</li>
                        <li>鞍山</li>
                        <li>安庆</li>
                        <li>安阳</li>
                    </ul>
                </div>
                <div>
                    <h2>B</h2>
                    <ul>
                        <li>北京</li>
                        <li>保定</li>
                        <li>蚌埠</li>
                        <li>包头</li>
                    </ul>
                </div>
                <div>
                    <h2>A</h2>
                    <ul>
                        <li>阿拉善盟</li>
                        <li>鞍山</li>
                        <li>安庆</li>
                        <li>安阳</li>
                    </ul>
                </div>
                <div>
                    <h2>B</h2>
                    <ul>
                        <li>北京</li>
                        <li>保定</li>
                        <li>蚌埠</li>
                        <li>包头</li>
                    </ul>
                </div>	
            </div>
        </div>
        <div class="city_index">
            <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
            </ul>
        </div> -->
        <div class="city_list">
            <Scroller ref="city_list">
                <div>
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix">
                            <li v-for="item in hotList" :key="item.id">{{ item.nm }}</li>
                        </ul>
                    </div>
                    <div class="city_sort" ref="city_sort">
                        <div v-for="item in cityList" :key="item.id">
                            <h2>{{ item.index }}</h2>
                            <ul>
                                <li v-for="cityItem in item.list" :key="cityItem.id">{{ cityItem.nm }}</li>
                            </ul>
                        </div>
                    </div> 
                </div> 
            </Scroller>
        </div>  
        <div class="city_index">
            <ul ref="city_index">
                <li v-for="(cityIndex,index) in cityList" 
                :key="cityIndex.id"
                @touchstart="handleToIndex(index)"
                :class="{'cur':!index}"
                >
                
                    {{ cityIndex.index }}
                
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'City',
    data() {
        return {
            cityList : [],
            hotList : []
        }
    },
    mounted() {
        this.axios.get('/api/citylist').then((res) => {
            let msg = res.data.msg;
            // console.log(res)
            if(msg == "ok"){
                let cities = res.data.data.cities;
                let { cityList , hotList } = this.formatCityList(cities);
                this.cityList = cityList;
                this.hotList = hotList;
            }
        })
    
    },
    activated(){
        this.setCurCity(0);  //
    },
    methods: {
        formatCityList(cities){
            let cityList = [];
            let hotList = [];
            for(var i=0;i<cities.length;i++){
                let firstLetter = cities[i].py.substring(0,1).toUpperCase();
                if(toCom(firstLetter)) { //新添加Index
                    cityList.push({ index : firstLetter,list: [{nm : cities[i].nm,id : cities[i].id}]})
                }else{ //累加到已有的Index
                    for(var j=0;j<cityList.length;j++){
                        if(cityList[j].index === firstLetter){
                            cityList[j].list.push({nm : cities[i].nm, id : cities[i].id})
                        }
                    }
                }
                //热门城市
                if(cities[i].isHot === 1){
                    hotList.push(cities[i])
                }
            }
            cityList.sort((n1,n2)=>{   //城市排序
                if(n1.index > n2.index){
                    return 1;
                }else if(n1.index < n2.index){
                    return -1;
                }else{
                    return 0;
                }
            })
            function toCom(firstLetter){
                for(var i=0;i<cityList.length;i++){
                    if(cityList[i].index === firstLetter){
                        return false
                    }
                }
                return true;
            }

            return {
                cityList,
                hotList
            }
        },
        handleToIndex(index){
            let h2 = this.$refs.city_sort.getElementsByTagName("h2");
            // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
            this.$refs.city_list.ToScrollTop(-h2[index].offsetTop);
            this.setCurCity(index);

        },
        setCurCity(index){
            let cityLi = this.$refs.city_index.getElementsByTagName("li");
            for(let i=0;i<cityLi.length;i++){
                cityLi[i].classList = "";
            }
            cityLi[index].classList.add("cur")
        }
    }
}
</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul{}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort{}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
.city_body .city_index li.cur{font-size: 18px;font-weight: bold;}
</style>