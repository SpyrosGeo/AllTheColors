import sizes from './sizes';
export default{
    root: {
        backgroundColor: "blue",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        [sizes.down('xl')]:{
            width:"80%"
        },
        [sizes.down('xl')]:{
            width:"70%"
        },
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white",
        alignItems:"center",
        "& a":{
            color:"white",
            textDecoration:"none",
            border:"1px solid white",
            padding:"0.7rem"
        },
        "& a:hover":{
            cursor:"pointer"
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3,30%)",
        gridGap: "5%",
        [sizes.down('md')]:{
            gridTemplateColumns: "repeat(2,50%)",
        },
        [sizes.down('xs')]:{
            gridTemplateColumns: "repeat(1,100%)",
        },
    }
}