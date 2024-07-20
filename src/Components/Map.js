// src/components/Map.jsx
import React, { useEffect, useRef } from 'react';

const Map = () => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    const initMap = () => {
      if (mapContainer.current && !mapInstance.current) {
        mapInstance.current = window.DG.map(mapContainer.current, {
          center: [43.254759, 76.931142], // координаты центра карты
          zoom: 16, // уровень масштаба карты
        });
        const icon = window.DG.icon({
          iconUrl: '../Assets/logo2.png', // URL вашего изображения
          iconSize: [42, 42], // Размер иконки
          iconAnchor: [21, 42], // Точка привязки иконки (центр снизу)
        });

        // Пример добавления маркера
        window.DG.marker([43.254759, 76.931142], { icon }).addTo(mapInstance.current).bindPopup('KnewIT');
      }
    };

    // Проверка, загружен ли скрипт 2ГИС
    if (window.DG.map) {
      initMap();
    } else {
      window.addEventListener('load', initMap);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return <div className="map2" ref={mapContainer} style={{ width: '80%', height: '210px', borderRadius: '20px', boxShadow: "0px 0px 20px 1px rgba(0, 0, 0, 0.1)" }} />;
};

export default Map;
