<template>
    <div class="movie_body">
        <ul>
            <li v-for="mlist in movieList" :key="mlist.id">
                <div class="pic_show"><img :src="mlist.img | setWH('128.180')"></div>
                <div class="info_list">
                    <h2>
                        {{ mlist.nm }}
                        <img v-if='mlist.version' src="@/assets/maxs.png"/>
                    </h2>
                    <p>观众评 <span class="grade">{{ mlist.sc }}</span></p>
                    <p>主演:{{ mlist.star }}</p>
                    <p>今天{{ mlist.showst }}家影院放映{{ mlist.wish }}场</p>
                </div>
                <div class="btn_mail">
                    购票
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'NowPlaying',
    data() {
        return {
            movieList: []
        }
    },
    mounted() {
        this.axios.get('/api/movieOnInfoList?cityId=10').then((res) => {
            let msg = res.data.msg;
            if(msg === 'ok'){
                this.movieList = res.data.data.movieList;
                console.log(this.movieList);
            }
        });
    }
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px;display: inline-block; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mail , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>