// @Media (max-width:576.98px) {}


export default {
    up(){

    },
    down(size){
        const sizes ={
            xs:"576.98px",
            sm:"767.98px",
            md:"991.98px",
            lg:"1199.98px",
            xl:"1600px"
        }
        return `@media (max-width:${sizes[size]})`
    }
}