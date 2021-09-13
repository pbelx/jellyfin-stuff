new Vue({
    el: "#app",
    data() {
        return {
            msg: "onex",
            uname: "",
            fulllog:[],
            xname:"",
            xpass:"",
            search:true
        }
    },
    mounted(){
      this.onem()

    },
    methods: {
        onem() {
            this.msg = "vue yep"
            console.log("we up")
            // console.log(this.uname);
        },
        searchname() {
            // this.fulllog = []
            const socket = io("ws://192.168.1.103:4000")
            socket.on("connect", () => {
                this.fulllog = []
                let uname = this.uname
                socket.emit("search", uname)
                console.log("connected")
            })
            socket.on("searchm",(data)=>{
                console.log(data)
                this.msg=data
                this.fulllog.push(data)
            })
        },
        addname(){
  
            const socket = io("ws://192.168.1.103:4000")
            socket.on("connect", () => {
                this.fulllog = []
                this.msg = ""
                let info = {
                    "pname":this.xname,
                    "pass":this.xpass

                }

                socket.emit("addname", info)
                console.log("connected")
            })
            socket.on("addm",(data)=>{
                console.log(data)
                this.msg=data
                this.fulllog.push(data)
            })

            
        }
    }
})
