export default {
    path : '/movie',
    component : () => import('@/views/Movie'),
    children: [
        {
            path: 'city',
            component:  () => import('@/components/City')
        },
        {
            path: 'nowPlaying',
            component:  () => import('@/components/NowPlaying')
        },
        {
            path: 'commingSoon',
            component:  () => import('@/components/CommingSoon')
        },
        {
            path: 'search',
            component:  () => import('@/components/Search')
        },
        {
            path: 'detail/1/:movieId',  //命名视图
            components: {
                default: ()=> import('@/components/NowPlaying'),
                detail: ()=> import('@/views/Movie/detail')
            },
            props: {
                detail: true
            }
        },
        {
            path: 'detail/2/:movieId',  //命名视图
            components: {
                default: ()=> import('@/components/CommingSoon'),
                detail: ()=> import('@/views/Movie/detail')
            },
            props: {
                detail: true
            }
        },
        {
            path: '/movie',
            redirect: '/movie/nowPlaying'
        }
    ]
}