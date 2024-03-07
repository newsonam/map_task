'use client'

import dynamic from "next/dynamic"

const MapBase = dynamic(
    async() => await import ('./BaseMap'),
    {
        loading: () => <p>Loading Map...</p>,
        ssr: false
    }
)

function DynamicMap() {
    const center = [120.9842, 14.5995];
    // const center=[20.5937,78.9629];
    const zoom = 4;

    return (
        <MapBase center={center} zoom={zoom}></MapBase>
    )
}


export default DynamicMap;