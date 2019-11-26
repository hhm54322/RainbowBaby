/**
 * Sample React Native Photo
 * arry
 * @xjs
 */

import ImagePickerLib from 'react-native-image-crop-picker';   //第三方相机



var photoOptions = {
    //底部弹出框选项
    title:'请选择',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
}


    //cropperCircleOverlay
      // ImagePickerLib.showImagePicker(photoOptions, (response) => {
      //       if (response.didCancel) {
      //         console.log('User cancelled image picker');
      //       }
      //       else if (response.error) {
      //         console.log('ImagePicker Error: ', response.error);
      //       }
      //       else if (response.customButton) {
      //         console.log('User tapped custom button: ', response.customButton);
      //       }
      //       else {
      //         let source = { 
      //           uri: response.uri,
      //           data: response.data
      //       };
      //         //'data:image/jpeg;base64,'
      //         if(func){
      //             func(source)
      //         }
      //       }
      //     });


      //相机  等选择
      ///选择调用相机还是 调用相册
export default class ImagePicker {

    constructor() {
    }

    //调用相机
    static openCamera(func){
        ImagePickerLib.openCamera({  
          width: 300,   //生成图片的width
          height: 300,  //生成图片的height
          cropping: true,   //是否剪裁
          cropperCircleOverlay:true,    //剪裁是否为圆形  //貌似没有用？？？？？？？？
          compressImageMaxWidth:150,    //压缩图的width
          compressImageMaxHeight:150,   //压缩图的height
        }).then(image => {  
          if(func){
            func(image)
          }
        });  
    }

    static openPicker(func){
      ImagePickerLib.openPicker({         //参数同上
          width: 300, 
          height: 300, 
          cropping: true,
          cropperCircleOverlay:true,
          compressImageMaxWidth:150,
          compressImageMaxHeight:150,
      }).then(image => { 
        if(func){
          func(image)
        }
      });
    }

    


  }

  
  