import URL from "./url.js"
export function handleImg(src){
        if(!src)
            {
                return ""; 
            }
        if(src.endsWith("png"))
            {
                return  URL.imgHost+"/"+src+".png";
            }
        if(src.endsWith("jpeg"))
            {
                return  URL.imgHost+"/"+src+".jpeg";
            }
        return "";

}
export function handleDetailImg(src){
    if(!src)
        {
            return ""; 
        }
    if(src.endsWith("png"))
        {
            return  URL.imgHost+"/"+src+".png?imageMogr/format/webp/thumbnail/!40p/blur/50x40/";
        }
    if(src.endsWith("jpeg"))
        {
            return  URL.imgHost+"/"+src+".jpeg?imageMogr/format/webp/thumbnail/!40p/blur/50x40/";
        }
    return "";

}
//存搜索记录
export function saveHistory(name="wz",key){
    var str=localStorage.getItem(name);
    var arr=str?JSON.parse(str):[];
    if(arr.indexOf(key)==-1)
        {
            arr.push(key);
        }
    localStorage.setItem(name,JSON.stringify(arr));
}
//获取搜索记录
export function getHistory(name,key){
    var str=localStorage.getItem(name);
    var arr=str?JSON.parse(str):[];
    return arr;
}
//存搜索记录
export function delHistory(name){
    localStorage.setItem(name,"");
}
//求数组最小值
export function getMin(arr){
    var min =arr[0].price;
    for(var i=0;i<arr.length;i++)
    {
        if(arr[i].price<min)
            {
                min=arr[i].price;
            }
    }
    return min;
}