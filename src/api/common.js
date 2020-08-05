import request from "./request";

// 图片上传
export function adsUpload(data) {
  return request({
    url: "/ads/upload",
    method: "post",
    data
  });
}