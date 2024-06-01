let headers = $request.headers


const headersList = ["X-RevenueCat-ETag", "If-None-Match", "If-Modified-Since"];
let len = headersList.length;
for ( let i = 0; i < len; ++i){
     if(headersList[i] in headers){ 
         headers[headersList[i]] = ``;
         console.log(headersList[i])
    }
}
$done({headers: headers})