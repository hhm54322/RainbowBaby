/**
 * Sample React Native Photo
 * arry
 * @xjs
 */

//已经废弃
export class UpFetch {

    constructor() {
    }
    static urlH  = 'http://47.99.57.113:10001'

    static putfile(source){

    //     fetch('http://ip.taobao.com/service/getIpInfo.php?ip=59.108.51.32', {
    //         method: 'GET',
    //         headers: {
    //            'Content-Type': 'application/json'
    //        }
    //    }).then((response) => {//1
    //        console.log(response);
    //    }).catch((err) => {//2
    //        console.error(err);
    //    });




        var url = urlH+''   //'http://localhost:8800/update'
        var file = {file:source.uri}
        var formData = new FormData()
        formData.append('file',source.uri)
        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:formData
        }).then(response => {
            // response.body is a readable stream.
            // Calling getReader() gives us exclusive access to the stream's content
            // var reader = response.body.getReader();
            // var bytesReceived = 0;
          
            // read() returns a promise that resolves when a value has been received
            // reader.read().then(function processResult(result) {
                
            //   // Result objects contain two properties:
            //   // done  - true if the stream has already given you all its data.
            //   // value - some data. Always undefined when done is true.
            //   if (result.done) {
            //     console.log("Fetch complete");
            //     return;
            //   }
          
            //   // result.value for fetch streams is a Uint8Array
            //   bytesReceived += result.value.length;
            //   console.log('Received', bytesReceived, 'bytes of data so far');
          
            //   // Read some more, and call this function again
            //   return reader.read().then(processResult);
            // });
        }).catch((err)=>{
            console.log(err)
        })
    }


  }

  
  