"use client";

import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useRef, useState } from "react";
import useKakaoLoader from "./loader/UseKaKaoLoader";

type PxItem = {
  martName: string;
  addr: string;
  tel: string;
  lat: string;
  lng: string;
};

export default function Home() {
  const [pxList, setPxList] = useState<PxItem[]>([]);

  useKakaoLoader();

  useEffect(() => {
    const getPxList = async () => {
      const res = await fetch("/api/mart");
      const data = await res.json();

      if (!window.kakao?.maps?.services) return;

      const geocoder = new window.kakao.maps.services.Geocoder();

      const items = data?.TB_MND_MART_CURRENT?.row || [];

      const coordsPromises = items.map(
        (item: any) =>
          new Promise<PxItem | null>((resolve) => {
            geocoder.addressSearch(item.LOC, (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const { y, x } = result[0];
                resolve({
                  martName: item.MART,
                  addr: item.LOC,
                  tel: item.TEL,
                  lat: y,
                  lng: x,
                });
              } else {
                resolve(null);
              }
            });
          })
      );

      const resolved = await Promise.all(coordsPromises);
      const valid = resolved.filter((item): item is PxItem => item !== null);
      setPxList(valid);
    };
    getPxList();
  }, []);

  const defaultCenter =
    pxList.length > 0
      ? { lat: parseFloat(pxList[0].lat), lng: parseFloat(pxList[0].lng) }
      : { lat: 33.5563, lng: 126.79581 };

  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <Map center={defaultCenter} className="w-1/2 h-1/2">
        {pxList.length > 0
          ? pxList.map((px, idx) => (
              <MapMarker
                key={idx}
                position={{ lat: parseFloat(px.lat), lng: parseFloat(px.lng) }}
              >
                <div style={{ padding: "4px", color: "#000" }}>
                  <strong>{px.martName}</strong>
                  <br />
                  {px.addr}
                </div>
              </MapMarker>
            ))
          : null}
      </Map>
    </main>
  );
}
