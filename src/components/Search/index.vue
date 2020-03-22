<template>
    <div class="search_body">
        <div class="search_input">
            <div class="search_input_wrapper">
                <i class="iconfont icon-sousuo"></i>
                <input type="text" v-model="message">
            </div>					
        </div>
        <Loading v-if="isLoading"/>
        <div v-if="!isLoading" class="search_result">
            <h3>电影/电视剧/综艺</h3>
            <ul>
                <li v-for="item in movieList" :key="item.id">
                    <div class="img"><img :src=" item.img | setWH('128.180') "></div>
                    <div class="info">
                        <p><span>{{ item.nm }}</span><span>{{ item.sc }}</span></p>
                        <p>{{ item.enm }}</p>
                        <p>{{ item.cat }}</p>
                        <p>{{ item.rt }}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div v-if="!isLoading" class="search_result">
            <h3>影院</h3>
            <ul>
                <li v-for="item in cinemaList" :key="item.id">
                    <div class="info">
                        <p>
                            影院名称:<span>{{ item.nm }}</span>
                            {{item.hallType}}
                        </p>
                        <p>距离您:{{ item.distance }}</p>
                        <p>票价:{{ item.sellPrice }}起</p>
                        <p>地址:{{ item.addr }}</p>
                    </div>
                </li>
            </ul>
        </div>

        <div v-show="noData" class="nodata">无搜索结果！</div>
    </div>
</template>

<script>
export default {
    name: 'Search',
    data() {
        return{
            message: '',
            movieList: [],
            cinemaList: [],
            isLoading: false,
            noData: false
        }
    },
    methods: {
        cancelRequest(){
            if(typeof this.source === 'function'){
                this.source('终止请求');
            }
        }
    },
    watch: {
        message(newVal){
            let curCityId = window.localStorage.getItem("nowId");
            this.isLoading = true;
            this.noData = false;
            // clearTimeout;
            // setTimeout()   防止快速输入 请求多次
            var that = this;
            this.cancelRequest();

            this.axios.get('/api/searchList?cityId='+curCityId+'&kw='+newVal,{
                cancelToken: new this.axios.CancelToken(function executor(c) {
                    that.source = c;
                })
            }).then((res) => {
                let msg = res.data.msg;
                let movie = res.data.data.movies; 
                let cinemas = res.data.data.cinemas; 
                this.isLoading = false;
                if(msg === "ok" && movies){
                    this.movieList = res.data.data.movies.list;
                    this.cinemaList = res.data.data.cinemas.list;
                }else{
                    this.noData = true;
                }
            }).catch((err) => {
                if (this.axios.isCancel(err)) {
                    console.log('Rquest canceled', err.message); //请求如果被取消，这里是返回取消的message
                } else {
                    //handle error
                    console.log(err);
                }
            })
        }
    }
}
</script>

<style scoped>
#content .search_body{ flex:1; overflow:auto;}
.search_body .search_input{ padding: 8px 10px; background-color: #f5f5f5; border-bottom: 1px solid #e5e5e5;}
.search_body .search_input_wrapper{ padding: 0 10px; border: 1px solid #e6e6e6; border-radius: 5px; background-color: #fff; display: flex; line-height: 20px;}
.search_body .search_input_wrapper i{font-size: 16px; padding: 4px 0;}
.search_body .search_input_wrapper input{ border: none; font-size: 13px; color: #333; padding: 4px 0; outline: none; margin-left: 5px; width:100%;}
.search_body .search_result{}
.search_body .search_result h3{ font-size: 15px; color: #999; padding: 9px 15px; border-bottom: 1px solid #e6e6e6;}
.search_body .search_result ul{}
.search_body .search_result li{ border-bottom:1px #c9c9c9 dashed; padding: 10px 15px; box-sizing:border-box; display: flex;}
.search_body .search_result .img{ width: 60px; float:left; }
.search_body .search_result .img img{ width: 100%; }
.search_body .search_result .info{ float:left; margin-left: 15px; flex:1;}
.search_body .search_result .info p{ display: flex; flex-wrap: wrap;line-height: 22px; font-size: 12px;}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1){ font-size: 18px; flex:1; min-width: 138px;}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2){ font-size: 16px; color:#fc7103;}
.search_body .nodata{padding:20px;text-align:center;}
</style>