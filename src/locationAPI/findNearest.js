// 从数据库中获取经纬度

// 使用哈弗辛公式计算两点之间的距离
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 地球半径，单位：千米

    // 将角度转为弧度
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);

    // 哈弗辛公式
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // 距离（千米）
    const distance = R * c;

    console.log(`两点之间的距离：${distance.toFixed(2)} 千米`);
    return distance;
}

// 返回最近的点
function findNearest(elderlyLat, elderlyLon, barberList) {
    let nearestDistance = Number.MAX_VALUE;
    let nearestBarber = null;

    for (const barber of barberList) {
        const distance = calculateDistance(elderlyLat, elderlyLon, barber.latitude, barber.longitude);

        if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestBarber = barber;
        }
    }

    return nearestBarber;
}
