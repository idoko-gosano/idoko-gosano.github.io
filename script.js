document.getElementById("getLocation").addEventListener("click", function () {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // 半径5km内でランダムな位置を生成
                // const randomLocation = generateRandomLocation(lat, lon, 5);

                // ユーザーが指定した距離を取得
                const radius = parseFloat(document.getElementById("range").value) || 5;

                                // ランダム位置を生成
                                const randomLocation = generateRandomLocation(lat, lon, radius);


                const resultText = `
                    あなたの現在地：緯度 ${lat.toFixed(5)}, 経度 ${lon.toFixed(5)}\n
                    ランダムな位置：緯度 ${randomLocation.latitude.toFixed(5)}, 経度 ${randomLocation.longitude.toFixed(5)}
                `;

                // document.getElementById("location").textContent = resultText;

                const locationElement = document.getElementById("location");
                locationElement.textContent = resultText;

// Google Mapリンク
const googleMapUrl = `https://www.google.com/maps?q=${randomLocation.latitude},${randomLocation.longitude}`;
const googleLink = document.createElement("a");
googleLink.href = googleMapUrl;
googleLink.textContent = "→ Googleマップで開く";
googleLink.target = "_blank";

// Apple Mapリンク
const appleMapUrl = `https://maps.apple.com/?ll=${randomLocation.latitude},${randomLocation.longitude}`;
const appleLink = document.createElement("a");
appleLink.href = appleMapUrl;
appleLink.textContent = "→ Appleマップで開く";
appleLink.target = "_blank";

// // 表示に追加
// const locationElement = document.getElementById("location");
// locationElement.appendChild(document.createElement("br"));
// locationElement.appendChild(googleLink);
// locationElement.appendChild(document.createElement("br"));
// locationElement.appendChild(appleLink);

//             },
// 表示を更新
locationElement.appendChild(document.createElement("br"));
locationElement.appendChild(googleLink);
locationElement.appendChild(document.createElement("br"));
locationElement.appendChild(appleLink);
},
            (error) => {
                document.getElementById("location").textContent = "位置情報が取得できませんでした。";
                console.error(error);
            }
        );
    } else {
        document.getElementById("location").textContent = "Geolocationがサポートされていません。";
    }
});


// 地球の半径（km）
const earthRadius = 6371;

// 指定距離（半径）km以内でランダムな緯度・経度を生成する関数
function generateRandomLocation(lat, lon, radiusInKm) {
    const radiusInRad = radiusInKm / earthRadius;

    const randomAngle = Math.random() * 2 * Math.PI;
    const randomDistance = radiusInRad * Math.sqrt(Math.random());

    const newLat = Math.asin(
        Math.sin(toRad(lat)) * Math.cos(randomDistance) +
        Math.cos(toRad(lat)) * Math.sin(randomDistance) * Math.cos(randomAngle)
    );
    const newLon = toRad(lon) + Math.atan2(
        Math.sin(randomAngle) * Math.sin(randomDistance) * Math.cos(toRad(lat)),
        Math.cos(randomDistance) - Math.sin(toRad(lat)) * Math.sin(newLat)
    );

    return {
        latitude: toDeg(newLat),
        longitude: toDeg(newLon)
    };
}

// 度→ラジアン変換
function toRad(degrees) {
    return degrees * Math.PI / 180;
}

// ラジアン→度変換
function toDeg(radians) {
    return radians * 180 / Math.PI;
}
