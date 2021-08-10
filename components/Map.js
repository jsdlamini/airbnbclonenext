import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';
import Image from 'next/image';


const Map = ({ searchResults }) => {

    const [selectedLocation, setSelectedLocation] = useState({})

    //Transform the search results object into the 
    // { latitude:xxxxx, longitude: xxxx} object 

    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat
    }))

    const center = getCenter(coordinates)

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    });



    return (
        <ReactMapGL
            mapStyle='mapbox://styles/johnsjdsd/cks1b3v211dml18o4147lc0s8'
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            width="100%"
            height="100%"
            onViewportChange={(viewport) => setViewport(viewport)}
        >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker
                        latitude={result.lat}
                        longitude={result.long}
                        offsetLeft={-20}
                        offsetTop={-10}

                    >
                        <p onClick={() => setSelectedLocation(result)}
                            className="cursor-pointer text-4xl animate-bounce text-red-400"


                        >
                            🖈

                        </p>


                    </Marker>
                    {/* Pop up to show if we click on a marker */}
                    {
                        selectedLocation.long === result.long ?
                            <Popup    closeOnClick={true} onClick={() => setSelectedLocation({})}
                                latitude={result.lat}
                                longitude={result.long}


                            >
                                <div className='flex flex-col flex-wrap content-center bg-gray-200   rounded-2xl p-4   '>
                                    <Image className="m-4" src={result.img} height={150} width={150} objectFit='contain' />
                                    <div>
                                        <p className=" z-50 text-xl font-semibold  "> {result.title}  </p>
                                        <p className=" cursor-pointer text-lg font-semibold text-blue-300  ">

                                            Book Now <span className="text-lg font-semibold text-red-600  "> 💛 </span>


                                        </p>


                                    </div>

                                </div>


                            </Popup>

                            : (false)

                    }
                </div>


            ))}


        </ReactMapGL>
    )
}

export default Map
