
//
import URL from "./url.js";
import axios from "axios";
//获取天气数据
export function getWeather(lat,lon){
    return new Promise((resolve,reject)=>{
        axios.get(URL.weatherAPI+`?latitude=${lat}&longitude=${lon}`).then((res)=>{
            resolve(res.data);
        })
    })
};
//获取地理位置数据
export function getAddress(lat,lon){
    return new Promise((resolve,reject)=>{
        axios.get(URL.addressAPI+`?latitude=${lat}&longitude=${lon}`).then((res)=>{
            resolve(res.data.address);
        })
    })
};
//获取附近地理位置数据
export function getAddressNear(lat,lon,key){
    return new Promise((resolve,reject)=>{
        axios.get(URL.addressNearAPI+`?latitude=${lat}&longitude=${lon}&keyword=${key}&offset=0&limit=20`).then((res)=>{
            var arr=[];
            res.data.map((obj)=>{
                var a={}
                a.name=obj.name;
                a.address=obj.address;
                a.city=obj.city;
                a.latitude=obj.latitude;
                a.longitude=obj.longitude;
                a.geohash=obj.geohash;
                a.short_address=obj.short_address;                                                          
                arr.push(a);
            })
            resolve(arr);
        })
    })
};
//获取热搜数据
export function getHotWord(lat,lon,key=""){
    return new Promise((resolve,reject)=>{
        var path=URL.hotWordAPI+`?latitude=${lat}&longitude=${lon}`;
        if(key)
            {
                var a=[]
                for(var i in key)
                {
                    a.push(i+"="+key[i])
                }
               
                path+= "&"+a.join("&");
            }
        axios.get(path).then((res)=>{
            var arr=res.data.map((v)=>{
                return v.search_word;
            })
            resolve(arr);
            
        })
    })
};
//获取页面载入数据
export function entryList(lat,lon){
    return new Promise((resolve,reject)=>{
        axios.get(URL.entryAPI+`&latitude=${lat}&longitude=${lon}`).then((res)=>{
            var arr=res.data[0].entries;
            var arr1=arr.map((obj)=>{
                var o={}
                o.image_hash=obj.image_hash;
                o.name=obj.name;
                o.link=obj.link;
                return o;
            })
            resolve(arr1);
        })
    })
}

//获取商家商品数据
export function sellerGoods(id){
    return new Promise((resolve,reject)=>{
        axios.get(URL.sellerGoodsAPI+`?restaurant_id=${id}`).then((res)=>{
            var arr1=res.data.map((obj)=>{
                var o={}
                o.icon_url=obj.icon_url;
                o.name=obj.name;
                o.foods=obj.foods;
                return o;
            })
            resolve(arr1);
        })
    })
}
//获取商家列表数据
export function sellerList(lat,lon,offset,limit){
    return new Promise((resolve,reject)=>{
        axios.get(URL.sellerAPI+`?&extras[]=activities&latitude=${lat}&longitude=${lon}&&offset=${offset}&limit=${limit}`).then((res)=>{
            var arr=res.data;
            var arr1=arr.map((obj)=>{
                var o={}
                o.image_path=obj.image_path; //图片
                o.name=obj.name;  //商户名字
                o.rating=obj.rating; //评分                
                o.order_num=obj.recent_order_num; //月销售
                o.is_premium=obj.is_premium; //品牌
                o.minimum_order_amount=obj.float_minimum_order_amount;//25元起送
                o.delivery_fee=obj.float_delivery_fee; //配送费
                o.distance=obj.distance; //距离
                o.order_lead_time=obj.order_lead_time ;//配送时间58分钟
                o.activities=obj.activities; //店家活动
                o.delivery_mode=obj.delivery_mode; //快递公司
                o.showAllActives=false;
                o.showActives=true;
                o.id=obj.id; //商家id
                o.promotion_info=obj.promotion_info !="" ? obj.promotion_info : ["欢迎光临，用餐高峰期请提前下单，谢谢。"]//公告
                if(obj.supports.length)
                    {
                        o.supports=obj.supports.map((v)=>{
                           return  v.icon_name; //商家支持开票
                        })
                    }
                else{
                        o.supports=[]; //商家支持开票
                }
                return o;
            })
            resolve(arr1);
        })
    })
}
//搜索商家信息
export function sellerSearchList(lat,lon,key,offset,limit){
    return new Promise((resolve,reject)=>{
        axios.get(URL.sellerSearchAPI+`?&extras[]=activities&latitude=${lat}&longitude=${lon}&keyword=${key}&offset=${offset}&limit=${limit}&search_item_type=2`).then((res)=>{
            
            var arr=res.data.restaurant_with_foods;
            var arr1=arr.map((obj)=>{
                var o={}
                o.image_path=obj.restaurant.image_path; //图片
                o.name=obj.restaurant.name;  //商户名字
                o.rating=obj.restaurant.rating; //评分                
                o.order_num=obj.restaurant.recent_order_num; //月销售
                o.is_premium=obj.restaurant.is_premium; //品牌
                o.minimum_order_amount=obj.restaurant.float_minimum_order_amount;//25元起送
                o.delivery_fee=obj.restaurant.float_delivery_fee; //配送费
                o.distance=obj.restaurant.distance; //距离
                o.order_lead_time=obj.restaurant.order_lead_time ;//配送时间58分钟
                o.activities= obj.restaurant.activities//obj.activities; //店家活动
                o.delivery_mode=obj.restaurant.delivery_mode; //快递公司
                o.showAllActives=false;
                o.showActives=false;
                o.id=obj.restaurant.id; //商家id
                o.promotion_info=obj.restaurant.promotion_info !="" ? obj.restaurant.promotion_info : ["欢迎光临，用餐高峰期请提前下单，谢谢。"]//公告
                if(obj.restaurant.supports.length)
                    {
                        o.supports=obj.restaurant.supports.map((v)=>{
                           return  v.icon_name; //商家支持开票
                        })
                    }
                else{
                        o.supports=[]; //商家支持开票
                }
                return o;
            })
            resolve(arr1);
        })
    })
}



//获取商家信息
export function sellerInfor(lat,lon,id){
    return new Promise((resolve,reject)=>{
        axios.get(URL.sellerInforAPI+id+
            '?extras[]=activities'+
            '&extras[]=albums'+
            '&extras[]=license'+
            '&extras[]=identification'+
            '&extras[]=qualification'+
            '&terminal=h5'+
            `&latitude=${lat}&latitude=${lon}`
        ).then((res)=>{
           var obj={};
           obj.activities=res.data.activities;
           obj.albums=res.data.albums;
           obj.description=res.data.description ? res.data.description : "暂无简介";
           obj.phone=res.data.phone.split(" ");
           obj.address=res.data.address;
           obj.supports=res.data.supports;
           obj.albums=res.data.albums; 
           obj.opening_hours=res.data.opening_hours;                     
           resolve(obj)                                 
        })
    })
}
//获取商家评论综合数据
export function sellerRating(id){
    return new Promise((resolve,reject)=>{
        axios.get(URL.sellerRatingAPI+`${id}/ratings/tags`)
        .then((res)=>{
            resolve(res.data)
        })
    })
}
//获取商家评分
export function sellerScore(id){
    return new Promise((resolve,reject)=>{
        axios.get(URL.sellerRatingAPI+`${id}/ratings/scores`)
        .then((res)=>{
            resolve(res.data)
        })
    })
}
//获取评论信息
export function userComment(id,key,offset,limit){
    if(!limit)
        {
            limit=10;
        }
    if(key=="全部")
    {
        key=""
    }
    return new Promise((resolve,reject)=>{
        axios.get(URL.sellerRatingAPI+`${id}/ratings/?has_content=true&offset=${offset}&limit=${limit}&tag_name=${key}`)
        .then((res)=>{
            resolve(res.data)
        })
    })
}
