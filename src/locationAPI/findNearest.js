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

// // 返回最近的点
// function findNearest(elderlyLat, elderlyLon, barberList) {
//     let nearestDistance = Number.MAX_VALUE;
//     let nearestBarber = null;
//
//     for (const barber of barberList) {
//         const distance = calculateDistance(elderlyLat, elderlyLon, barber.latitude, barber.longitude);
//
//         if (distance < nearestDistance) {
//             nearestDistance = distance;
//             nearestBarber = barber;
//         }
//     }
//
//     return nearestBarber;
// }

// 使用最小堆法找前 10 小值
function findTop10Closest(barbers, calculateDistance) {
    // 使用一个最小堆，模拟前10个距离最近的理发师
    let top10 = [];

    for (let barber of barbers) {
        const distance = calculateDistance(barber);

        // 如果当前堆不足10个，直接加入
        if (top10.length < 10) {
            top10.push({ barber, distance });
            top10.sort((a, b) => a.distance - b.distance);
        } else if (distance < top10[9].distance) {
            // 如果堆已满且当前距离比第10个小，则替换第10个
            top10[9] = { barber, distance };
            top10.sort((a, b) => a.distance - b.distance);
        }
    }

    return top10.map(entry => entry.barber);
}

