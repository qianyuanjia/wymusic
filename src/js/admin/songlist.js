{
    let view={
        el:'.songlist',
        template:`
                <li data-song-id="{{id}}">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-music"></use>
                    </svg>
                    <div class="listwrap">
                        <p class="songname">{{name}}</p>
                        <p class="singer">{{singer}}</p>
                    </div>
                </li>
        `,
        render(songs){
            if(songs.length>0){
                let htmlStr=''
                for(let i=songs.length-1;i>=0;i--){
                    let str=this.template
                    str=str.replace('{{id}}',songs[i].id)
                    str=str.replace('{{name}}',songs[i].attributes.name)
                    str=str.replace('{{singer}}',songs[i].attributes.singer)
                    htmlStr+=str
                }
                $(this.el).html(htmlStr)
            }
        }
    }
    let modle={
        init(){
            var APP_ID = 'TLbHUXKn9WBbtCYOr8yGfNdf-gzGzoHsz';
            var APP_KEY = 'TvM4cjnCvH4vVgC0p4MeCA6o';

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        getAllSongInfo(){
            var query = new AV.Query('Song');
            query.find().then((songs)=>{
                this.songs=songs
                this.view.render(songs)
            })
        },
        getSongInfo(id){
            var query = new AV.Query('Song');
            query.get(id).then((song)=>{
                window.eventHub.emit('fetchSongInfo',Object.assign(song.attributes,{id}))
            })
        }
    }
    let controller={
        init(view,modle){
            this.view=view
            this.modle=modle
            this.modle.init()
            this.modle.getAllSongInfo.call(this)
            this.bindEvents()
        },
        bindEvents(){
            window.eventHub.on('save_success',(data)=>{
                this.songs.push(data)
                this.view.render(this.songs)
            })
            window.eventHub.on('update_success',(data)=>{
                for(let i=0;i<this.songs.length;i++){
                    if(this.songs[i].id===data.id){
                        this.songs.splice(i,1,data)
                        break
                    }
                }
                this.view.render(this.songs)
            })
            window.eventHub.on('delete_success',(data)=>{
                for(let i=0;i<this.songs.length;i++){
                    if(this.songs[i].id===data.id){
                        this.songs.splice(i,1)
                        break
                    }
                }
                this.view.render(this.songs)
            })
            $(this.view.el).on('click','li',(ev)=>{
                let id=$(ev.currentTarget).attr('data-song-id')
                this.modle.getSongInfo(id)
            })

        }
    }
    controller.init(view,modle)
}