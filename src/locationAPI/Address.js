const axios = require('axios');
const fs = require('fs');

/**
 * 获取当前 IP 定位（通过高德地图 IP 定位服务）
 * @param {string} key - 高德地图的 API Key
 * @returns {Promise<string>} - 返回经纬度信息
 */
async function getIpLocation(key) {
    const url = `https://restapi.amap.com/v3/ip?key=${key}`;

    try {
        const response = await axios.get(url);
        console.log(response.data); // 打印响应内容，调试

        if (response.data.status === "1") {
            const location = response.data;
            // 提取矩形范围并计算中心点经纬度
            const rectangle = location.rectangle.split(";");
            const [lon1, lat1] = rectangle[0].split(",");
            const [lon2, lat2] = rectangle[1].split(",");

            // 计算中心点经纬度
            const centerLongitude = (parseFloat(lon1) + parseFloat(lon2)) / 2;
            const centerLatitude = (parseFloat(lat1) + parseFloat(lat2)) / 2;

            // 创建 JSON 对象
            const locationData = {
                latitude: centerLatitude,
                longitude: centerLongitude,
                city: location.city,
                province: location.province,
                adcode: location.adcode
            };

            // 转为 JSON 字符串
            const jsonLocation = JSON.stringify(locationData);
            // 将 JSON 字符串写入文件
            fs.writeFileSync('location.json', jsonLocation, 'utf8');

            console.log("经纬度信息已保存到文件：location.json");
            return jsonLocation; // 返回 JSON 格式字符串
        } else {
            throw new Error("IP 定位失败，错误码：" + response.data.infocode);
        }
    } catch (error) {
        console.error("Error occurred: ", error);
        return null;
    }
}
// 测试调用
const key = "2f4eff8990837ba9fd0ace2c67c1a043";
getIpLocation(key).then(location => {
    console.log(location);
});
